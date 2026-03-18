import { useAREF } from '../../context/AREFContext.jsx';

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function statusBadge(s) {
  return { new: 'badge-red', reviewing: 'badge-amber', accepted: 'badge-green', declined: 'badge-gray' }[s] || 'badge-gray';
}

function MiniAvatar({ fellow }) {
  const initials = (fellow.name || '').split(' ').map(w => w[0] || '').slice(0, 2).join('').toUpperCase();
  return (
    <div className="mini-avatar">
      {fellow.photoUrl
        ? <img src={fellow.photoUrl} onError={e => e.target.style.display = 'none'} alt="" />
        : initials
      }
    </div>
  );
}

export default function DashboardPanel({ setActivePanel, showToast }) {
  const { fellows, submissions, projects, publications } = useAREF();
  const newSubs = submissions.filter(s => s.status === 'new').length;

  return (
    <div className="panel active">
      <div className="stats-row">
        <div className="stat-card"><div className="stat-label">Total Fellows</div><div className="stat-num">{fellows.length}</div><div className="stat-sub">{fellows.filter(f => f.priority).length} priority fellows</div></div>
        <div className="stat-card"><div className="stat-label">New Submissions</div><div className="stat-num" style={{ color: 'var(--red)' }}>{newSubs}</div><div className="stat-sub">{submissions.length} total applications</div></div>
        <div className="stat-card"><div className="stat-label">Research Projects</div><div className="stat-num">{projects.length}</div><div className="stat-sub">{projects.filter(p => p.status === 'ongoing').length} ongoing</div></div>
        <div className="stat-card"><div className="stat-label">Publications</div><div className="stat-num">{publications.length}</div><div className="stat-sub">{publications.filter(p => p.open === true || p.open === 'true').length} open access</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="table-card">
          <div className="table-header">
            <h3>Recent Submissions</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setActivePanel('submissions')}>View all</button>
          </div>
          {submissions.slice(0, 5).length > 0
            ? submissions.slice(0, 5).map(s => (
                <div key={s.id} style={{ padding: '0.9rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.firstName} {s.lastName}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.institution} · {s.country}</div>
                  </div>
                  <span className={`badge ${statusBadge(s.status)}`}>{s.status}</span>
                </div>
              ))
            : <div className="empty"><h3>No submissions yet</h3></div>
          }
        </div>

        <div className="table-card">
          <div className="table-header">
            <h3>Active Fellows</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setActivePanel('fellows')}>View all</button>
          </div>
          {fellows.slice(0, 5).length > 0
            ? fellows.slice(0, 5).map(f => (
                <div key={f.id} style={{ padding: '0.9rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MiniAvatar fellow={f} />
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{f.institution}</div>
                  </div>
                  {f.priority && <span className="badge badge-gold" style={{ marginLeft: 'auto' }}>Priority</span>}
                </div>
              ))
            : <div className="empty"><h3>No fellows yet</h3></div>
          }
        </div>
      </div>
    </div>
  );
}
