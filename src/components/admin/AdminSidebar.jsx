import { useAREF } from '../../context/AREFContext.jsx';
import { useAuth } from '../../hooks/useAuth.js';

export default function AdminSidebar({ activePanel, setActivePanel }) {
  const { fellows, projects, publications, submissions, logout } = useAREF();
  const newCount = submissions.filter(s => s.status === 'new').length;

  const navItem = (panel, label, icon) => (
    <div
      className={`sb-link${activePanel === panel ? ' active' : ''}`}
      onClick={() => setActivePanel(panel)}
    >
      {icon}
      {label}
      {panel === 'fellows' && <span className="sb-badge">{fellows.length}</span>}
      {panel === 'projects' && <span className="sb-badge">{projects.length}</span>}
      {panel === 'publications' && <span className="sb-badge">{publications.length}</span>}
      {panel === 'submissions' && <span className={`sb-badge${newCount > 0 ? ' red' : ''}`}>{newCount}</span>}
    </div>
  );

  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-mark">
          <img src="/Institute-Logo.png" alt="Genomac Institute Logo" />
        </div>
        <div>
          <div className="sb-logo-text">AREF Admin</div>
          <div className="sb-logo-sub">Genomac Institute</div>
        </div>
      </div>
      <nav className="sb-nav">
        <div className="sb-section">Overview</div>
        {navItem('dashboard', 'Dashboard', (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        ))}
        <div className="sb-section">Content</div>
        {navItem('fellows', 'Fellows', (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
        ))}
        {navItem('projects', 'Research Projects', (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        ))}
        {navItem('publications', 'Publications', (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        ))}
        <div className="sb-section">Applications</div>
        {navItem('submissions', 'Submissions', (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
        ))}
        <div className="sb-section">Site</div>
        <div className="sb-link" onClick={() => window.open('/', '_blank')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View Live Site
        </div>
      </nav>
      <div className="sb-footer">
        <a href="#" onClick={e => { e.preventDefault(); logout(); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </a>
      </div>
    </aside>
  );
}
