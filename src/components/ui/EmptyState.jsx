export default function EmptyState({ title = 'No results found', desc = 'Try adjusting your filters.' }) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--p400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
    </div>
  );
}
