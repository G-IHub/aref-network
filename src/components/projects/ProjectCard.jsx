const STATUS_CLASS = { ongoing: 'status-ongoing', completed: 'status-completed', planned: 'status-planned' };

export default function ProjectCard({ project: p }) {
  const tags = p.tags || [];
  return (
    <div className="proj-card">
      <div className="proj-card-head">
        <div className="proj-title">{p.title}</div>
        <span className={`status-badge ${STATUS_CLASS[p.status] || ''}`}>{p.status}</span>
      </div>
      <div className="proj-meta">
        <div className="proj-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
          </svg>
          {p.fellowName || '—'}
        </div>
        <div className="proj-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          {p.institution || '—'}
        </div>
        {p.students > 0 && (
          <div className="proj-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            {p.students} students
          </div>
        )}
        {p.startDate && (
          <div className="proj-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Started {p.startDate}
          </div>
        )}
      </div>
      {p.description && <div className="proj-desc">{p.description}</div>}
      <div className="proj-footer">
        <div className="proj-tags">
          {tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
        </div>
        {p.dataset && (
          <div className="proj-dataset">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            {p.dataset}
          </div>
        )}
      </div>
    </div>
  );
}
