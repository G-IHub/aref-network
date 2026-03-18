import { NavLink } from 'react-router-dom';

export default function SubNav() {
  return (
    <div className="sub-nav">
      <div className="sub-nav-inner">
        <NavLink to="/research-tracks" className={({ isActive }) => `sub-nav-link${isActive ? ' active' : ''}`}>
          Track Architecture
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `sub-nav-link${isActive ? ' active' : ''}`}>
          Ongoing Projects
        </NavLink>
        <NavLink to="/publications" className={({ isActive }) => `sub-nav-link${isActive ? ' active' : ''}`}>
          Research Publications
        </NavLink>
      </div>
    </div>
  );
}
