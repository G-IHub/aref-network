import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="footer-logo-text">Genomac Institute Inc. — AREF</div>
        <div className="footer-sub">Academic Research Enablement Framework · Genomics · Bioinformatics · Computational Biology</div>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/fellows">Fellows</Link>
        <Link to="/research-tracks">Research Tracks</Link>
        <Link to="/network">Network</Link>
        <Link to="/apply">Apply</Link>
      </div>
      <div className="footer-sub">Confidential — For AREF Research Fellows Only · © 2026</div>
    </footer>
  );
}
