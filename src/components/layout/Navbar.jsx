import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About AREF' },
    { to: '/fellows', label: 'Fellows' },
    { to: '/research-tracks', label: 'Research Tracks' },
    { to: '/network', label: 'Network & Events' },
    { to: '/apply', label: 'Apply', className: 'apply' },
  ];

  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        <div className="nav-logo-mark">
          <img src="/Institute-Logo.png" alt="Genomac Institute Logo" />
        </div>
        <div>
          <div className="nav-logo-text">Genomac Institute inc.</div>
          <div className="nav-logo-sub">AREF Network</div>
        </div>
      </NavLink>

      <div className={`nav-links${mobileOpen ? ' open' : ''}`}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              [l.className, isActive ? 'active' : ''].filter(Boolean).join(' ') || undefined
            }
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      <button
        className={`nav-toggle${mobileOpen ? ' active' : ''}`}
        onClick={() => setMobileOpen(prev => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="nav-end">
        <button className="nav-btn" onClick={() => navigate('/apply')}>Apply to AREF</button>
      </div>
    </nav>
  );
}
