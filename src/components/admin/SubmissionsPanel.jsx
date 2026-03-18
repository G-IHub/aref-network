import { useState, useMemo } from 'react';
import Modal from '../ui/Modal.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import { useSubmissions } from '../../hooks/useSubmissions.js';

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function statusBadge(s) {
  return { new: 'badge-red', reviewing: 'badge-amber', accepted: 'badge-green', declined: 'badge-gray' }[s] || 'badge-gray';
}

export default function SubmissionsPanel({ showToast }) {
  const { submissions, setSubmissionStatus, removeSubmission } = useSubmissions();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedSub, setSelectedSub] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return submissions.filter(s => {
      const mQ = !q || `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) || (s.institution || '').toLowerCase().includes(q);
      const mS = !statusFilter || s.status === statusFilter;
      return mQ && mS;
    });
  }, [submissions, search, statusFilter]);

  function openSub(s) { setSelectedSub(s); setModalOpen(true); }

  function handleStatusChange(id, status) {
    if (!status) return;
    setSubmissionStatus(id, status);
    showToast('Status updated to: ' + status, 'success');
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!confirm('Delete this submission?')) return;
    removeSubmission(id);
    setModalOpen(false);
    showToast('Submission deleted');
  }

  return (
    <div className="panel active">
      <div className="table-card">
        <div className="table-header">
          <h3>Application Submissions</h3>
          <div className="filter-bar">
            <input className="filter-input" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>

        {filtered.length === 0
          ? <EmptyState title="No submissions found" />
          : (
            <table className="tbl">
              <thead><tr><th>Applicant</th><th>Institution</th><th>Research Area</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td><div style={{ fontWeight: 500 }}>{s.firstName || ''} {s.lastName || ''}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.email || ''}</div></td>
                    <td><div style={{ fontSize: 13 }}>{s.institution || '—'}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.country || ''}</div></td>
                    <td><span className="badge badge-purple">{s.researchArea || '—'}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--muted)' }}>{fmtDate(s.submittedAt)}</td>
                    <td><span className={`badge ${statusBadge(s.status)}`}>{s.status}</span></td>
                    <td>
                      <div className="tbl-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openSub(s)}>View</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="720px">
        <div className="modal-head">
          <h2>Application Details</h2>
          <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
        </div>
        {selectedSub && (
          <>
            <div className="modal-body">
              <div className="sub-detail-grid">
                {[
                  ['Name', `${selectedSub.firstName || ''} ${selectedSub.lastName || ''}`],
                  ['Email', selectedSub.email || '—'],
                  ['Position', selectedSub.position || '—'],
                  ['Institution', selectedSub.institution || '—'],
                  ['Country', selectedSub.country || '—'],
                  ['Research Area', selectedSub.researchArea || '—'],
                  ['Expected Cohort Size', selectedSub.cohortSize || '—'],
                  ['Referee / Supervisor', selectedSub.referee || '—'],
                  ['How they heard', selectedSub.source || '—'],
                  ['Submitted', fmtDate(selectedSub.submittedAt)],
                ].map(([label, val]) => (
                  <div key={label} className="sub-detail">
                    <div className="sub-detail-label">{label}</div>
                    <div className="sub-detail-val">{val}</div>
                  </div>
                ))}
                {selectedSub.cvFile && <div className="sub-detail"><div className="sub-detail-label">CV File</div><div className="sub-detail-val">{selectedSub.cvFile}</div></div>}
                {selectedSub.proposalFile && <div className="sub-detail"><div className="sub-detail-label">Proposal File</div><div className="sub-detail-val">{selectedSub.proposalFile}</div></div>}
              </div>
              <div className="sub-detail-label" style={{ marginBottom: 6 }}>Research Interest Statement</div>
              <div className="sub-statement">{selectedSub.statement || 'No statement provided.'}</div>
              <div className="sub-detail-label" style={{ marginBottom: 6 }}>Current Status</div>
              <span className={`badge ${statusBadge(selectedSub.status)}`} style={{ fontSize: 13, padding: '5px 14px' }}>{selectedSub.status}</span>
            </div>
            <div className="modal-foot">
              <select className="filter-select" defaultValue="" onChange={e => handleStatusChange(selectedSub.id, e.target.value)}>
                <option value="">Change status…</option>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
              </select>
              <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Close</button>
              <button className="btn btn-danger" onClick={() => handleDelete(selectedSub.id)}>Delete</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
