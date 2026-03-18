import FellowAvatar from './FellowAvatar.jsx';

export default function FellowCard({ fellow, onClick }) {
  const tags = (fellow.tags || []).slice(0, 3);

  return (
    <div className="fellow-card" onClick={onClick}>
      <div className="fellow-card-top">
        <FellowAvatar fellow={fellow} size="sm" />
        <div>
          <div className="fellow-name">{fellow.name}</div>
          <div className="fellow-ftitle">{fellow.title || ''}</div>
          <div className="fellow-top-badges">
            <span className="fellow-status">
              <span className="fellow-status-dot"></span>Active Fellow
            </span>
            {fellow.priority && <span className="priority-badge">Priority Fellow</span>}
          </div>
        </div>
      </div>

      <div className="fellow-card-body">
        <div className="fellow-meta">
          <div className="fellow-meta-row">
            <svg className="fellow-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {fellow.institution || ''}
          </div>
          <div className="fellow-meta-row">
            <svg className="fellow-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {fellow.location || ''}
          </div>
        </div>
        <div className="ra-box">
          <div className="ra-label">Research Track</div>
          <div className="ra-title">{fellow.trackTitle || ''}</div>
          <div className="ra-tags">
            {tags.map(t => <span key={t} className="ra-tag">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="fellow-footer">
        <span className="fellow-cycle">{fellow.cycle || ''}</span>
        <button className="view-btn">
          View Profile
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
