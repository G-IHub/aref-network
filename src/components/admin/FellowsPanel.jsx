import { useState, useMemo } from 'react';
import Modal from '../ui/Modal.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import { useFellows } from '../../hooks/useFellows.js';

function MiniAvatar({ fellow }) {
  const initials = (fellow.name || '').split(' ').map(w => w[0] || '').slice(0, 2).join('').toUpperCase();
  return (
    <div className="mini-avatar">
      {fellow.photoUrl ? <img src={fellow.photoUrl} onError={e => e.target.style.display = 'none'} alt="" /> : initials}
    </div>
  );
}

const BLANK = { name: '', title: '', institution: '', location: '', country: '', cycle: 'AREF Cycle 2025', status: 'active', priority: false, trackTitle: '', area: 'pathogen genomics', tags: '', bio: '', ugStudents: 0, mscStudents: 0, phdStudents: 0, publications: 0, photoUrl: '', linkedin: '', orcid: '' };

export default function FellowsPanel({ showToast }) {
  const { fellows, addFellow, updateFellow, removeFellow } = useFellows();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(BLANK);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return fellows.filter(f => {
      const mQ = !q || f.name.toLowerCase().includes(q) || f.institution.toLowerCase().includes(q) || (f.trackTitle || '').toLowerCase().includes(q);
      const mS = !statusFilter || f.status === statusFilter;
      return mQ && mS;
    });
  }, [fellows, search, statusFilter]);

  function openAdd() {
    setEditId(null);
    setForm(BLANK);
    setModalOpen(true);
  }

  function openEdit(f) {
    setEditId(f.id);
    setForm({
      name: f.name || '', title: f.title || '', institution: f.institution || '', location: f.location || '',
      country: f.country || '', cycle: f.cycle || 'AREF Cycle 2025', status: f.status || 'active',
      priority: f.priority || false, trackTitle: f.trackTitle || '', area: f.area || 'pathogen genomics',
      tags: (f.tags || []).join(', '), bio: f.bio || '',
      ugStudents: f.students?.ug || 0, mscStudents: f.students?.msc || 0, phdStudents: f.students?.phd || 0,
      publications: f.publications || 0, photoUrl: f.photoUrl || '', linkedin: f.linkedin || '', orcid: f.orcid || '',
    });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    const data = {
      ...form,
      country: form.country.trim().toLowerCase(),
      priority: form.priority === true || form.priority === 'true',
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      students: { ug: +form.ugStudents || 0, msc: +form.mscStudents || 0, phd: +form.phdStudents || 0 },
      publications: +form.publications || 0,
    };
    delete data.ugStudents; delete data.mscStudents; delete data.phdStudents;
    if (editId) { updateFellow(editId, data); showToast('Fellow updated', 'success'); }
    else { addFellow(data); showToast('Fellow added', 'success'); }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!confirm('Delete this fellow? This cannot be undone.')) return;
    removeFellow(id);
    showToast('Fellow deleted');
  }

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="panel active">
      <div className="table-card">
        <div className="table-header">
          <h3>All Fellows</h3>
          <div className="filter-bar">
            <input className="filter-input" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="btn btn-primary" onClick={openAdd}>+ Add Fellow</button>
          </div>
        </div>

        {filtered.length === 0
          ? <EmptyState title="No fellows found" />
          : (
            <table className="tbl">
              <thead><tr><th>Fellow</th><th>Institution</th><th>Track / Area</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id}>
                    <td>
                      <div className="fellow-name-cell">
                        <MiniAvatar fellow={f} />
                        <div><div style={{ fontWeight: 500 }}>{f.name}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{f.title || ''}</div></div>
                      </div>
                    </td>
                    <td><div style={{ fontSize: 13 }}>{f.institution}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{f.location || ''}</div></td>
                    <td>
                      <div style={{ fontSize: 13, maxWidth: 220 }}>{f.trackTitle || '—'}</div>
                      <span className="badge badge-purple" style={{ marginTop: 4, display: 'inline-block' }}>{f.area || ''}</span>
                    </td>
                    <td style={{ fontSize: 13 }}>{(f.students?.ug || 0)}UG · {(f.students?.msc || 0)}MSc · {(f.students?.phd || 0)}PhD</td>
                    <td>
                      <span className={`badge ${f.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{f.status}</span>
                      {f.priority && <><br /><span className="badge badge-gold" style={{ marginTop: 3 }}>Priority</span></>}
                    </td>
                    <td>
                      <div className="tbl-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(f)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(f.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="modal-head">
          <h2>{editId ? 'Edit Fellow' : 'Add Fellow'}</h2>
          <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-section">Personal Information</div>
            <div className="fg"><label>Full Name *</label><input value={form.name} onChange={set('name')} placeholder="Dr. Jane Doe" /></div>
            <div className="fg"><label>Academic Title *</label><input value={form.title} onChange={set('title')} placeholder="Associate Professor of Genomics" /></div>
            <div className="fg"><label>Institution *</label><input value={form.institution} onChange={set('institution')} placeholder="University of Lagos" /></div>
            <div className="fg"><label>Location *</label><input value={form.location} onChange={set('location')} placeholder="Lagos, Nigeria" /></div>
            <div className="fg"><label>Country (lowercase, for filter)</label><input value={form.country} onChange={set('country')} placeholder="nigeria" /></div>
            <div className="fg"><label>Allocation Cycle</label><input value={form.cycle} onChange={set('cycle')} placeholder="AREF Cycle 2025" /></div>
            <div className="fg"><label>Status</label><select value={form.status} onChange={set('status')}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
            <div className="fg"><label>Priority Fellow?</label><select value={String(form.priority)} onChange={e => setForm(p => ({ ...p, priority: e.target.value === 'true' }))}><option value="false">No</option><option value="true">Yes — Priority Fellow</option></select></div>

            <div className="form-section">Research Profile</div>
            <div className="fg form-full"><label>Research Track Title *</label><input value={form.trackTitle} onChange={set('trackTitle')} placeholder="Antimicrobial Resistance Genomics in Clinical Isolates" /></div>
            <div className="fg"><label>Research Area</label>
              <select value={form.area} onChange={set('area')}>
                <option value="pathogen genomics">Pathogen Genomics</option>
                <option value="cancer genomics">Cancer Genomics</option>
                <option value="microbiome">Microbiome Research</option>
                <option value="computational biology">Computational Biology</option>
                <option value="bioinformatics">Bioinformatics</option>
              </select>
            </div>
            <div className="fg"><label>Tags (comma-separated)</label><input value={form.tags} onChange={set('tags')} placeholder="AMR, WGS, Clinical Microbiology" /></div>
            <div className="fg form-full"><label>Research Biography</label><textarea value={form.bio} onChange={set('bio')} rows="3" placeholder="Describe the fellow's research program…" /></div>

            <div className="form-section">Students & Output</div>
            <div className="fg"><label>Undergraduate Students</label><input type="number" min="0" value={form.ugStudents} onChange={set('ugStudents')} /></div>
            <div className="fg"><label>MSc Students</label><input type="number" min="0" value={form.mscStudents} onChange={set('mscStudents')} /></div>
            <div className="fg"><label>PhD Students</label><input type="number" min="0" value={form.phdStudents} onChange={set('phdStudents')} /></div>
            <div className="fg"><label>Publications in Track</label><input type="number" min="0" value={form.publications} onChange={set('publications')} /></div>

            <div className="form-section">Online Presence</div>
            <div className="fg form-full"><label>Photo URL</label><input value={form.photoUrl} onChange={set('photoUrl')} placeholder="https://example.com/photo.jpg" /></div>
            <div className="fg"><label>LinkedIn Profile URL</label><input value={form.linkedin} onChange={set('linkedin')} placeholder="https://linkedin.com/in/…" /></div>
            <div className="fg"><label>ORCID / Google Scholar URL</label><input value={form.orcid} onChange={set('orcid')} placeholder="https://orcid.org/0000-…" /></div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Fellow</button>
        </div>
      </Modal>
    </div>
  );
}
