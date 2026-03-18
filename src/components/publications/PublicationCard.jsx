function typeClass(t) {
  return t === 'Original Article' ? 'type-original' : t === 'Review' ? 'type-review' : 'type-other';
}

export default function PublicationCard({ pub: p }) {
  const isOA = p.open === true || p.open === 'true';
  return (
    <div className="pub-card">
      <div className="pub-card-head">
        <div className="pub-title">{p.title}</div>
        <span className={`pub-type-badge ${typeClass(p.type)}`}>{p.type || 'Article'}</span>
      </div>
      <div className="pub-authors">
        {p.authors || '—'} {p.fellowName && <span>· Led by {p.fellowName}</span>}
      </div>
      <div className="pub-meta-row">
        <div className="pub-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="pub-journal">{p.journal || '—'}</span>
        </div>
        {p.year && (
          <div className="pub-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {p.year}
          </div>
        )}
        {p.doi && (
          <div className="pub-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            DOI: {p.doi}
          </div>
        )}
      </div>
      <div className="pub-footer">
        <div className="pub-badges">
          <span className={`pub-type-badge ${isOA ? 'oa-badge' : 'sub-badge'}`}>
            {isOA ? 'Open Access' : 'Subscription'}
          </span>
          {p.area && <span className="pub-type-badge area-badge">{p.area}</span>}
        </div>
        <div className="pub-actions">
          {p.doi && (
            <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="doi-link">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View on DOI
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
