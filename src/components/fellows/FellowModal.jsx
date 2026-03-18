import FellowAvatar from './FellowAvatar.jsx';

export default function FellowModal({ fellow, onClose }) {
  if (!fellow) return null;
  const tags = (fellow.tags || []);

  return (
    <>
      <div className="modal-hdr">
        <FellowAvatar fellow={fellow} size="lg" />
        <div style={{ flex: 1 }}>
          <div className="m-name">{fellow.name}</div>
          <div className="m-title">{fellow.title || ''}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="fellow-status"><span className="fellow-status-dot"></span>Active Fellow</span>
            {fellow.priority && <span className="priority-badge">Priority Fellow</span>}
            <span style={{ background: 'rgba(200,151,61,0.22)', border: '1px solid rgba(200,151,61,0.3)', borderRadius: 100, padding: '3px 10px', fontSize: 10, color: 'var(--gold-light)' }}>
              {fellow.cycle || ''}
            </span>
          </div>
          {(fellow.linkedin || fellow.orcid) && (
            <div className="social-links">
              {fellow.linkedin && (
                <a href={fellow.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              )}
              {fellow.orcid && (
                <a href={fellow.orcid} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  ORCID / Scholar
                </a>
              )}
            </div>
          )}
        </div>
        <button className="m-close" onClick={onClose}>✕</button>
      </div>

      <div className="m-body">
        <div className="m-sec">Fellow Details</div>
        <div className="m-details">
          <div className="m-detail"><div className="m-detail-l">Institution</div><div className="m-detail-v">{fellow.institution || '—'}</div></div>
          <div className="m-detail"><div className="m-detail-l">Location</div><div className="m-detail-v">{fellow.location || '—'}</div></div>
          <div className="m-detail">
            <div className="m-detail-l">Students Supervised</div>
            <div className="m-detail-v">{fellow.students?.ug || 0} UG · {fellow.students?.msc || 0} MSc · {fellow.students?.phd || 0} PhD</div>
          </div>
          <div className="m-detail"><div className="m-detail-l">Publications</div><div className="m-detail-v">{fellow.publications || 0} outputs</div></div>
        </div>
        {fellow.bio && (
          <>
            <div className="m-sec">Research Biography</div>
            <p className="m-bio">{fellow.bio}</p>
          </>
        )}
        <div className="m-sec">Research Track</div>
        <div className="m-track">
          <div className="ra-label">Track Title</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--purple-800)', marginBottom: 10 }}>{fellow.trackTitle || '—'}</div>
          <div className="m-tags">
            {tags.map(t => <span key={t} className="m-tag">{t}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}
