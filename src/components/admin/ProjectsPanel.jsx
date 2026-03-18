import { useState, useMemo } from 'react';
import Modal from '../ui/Modal.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import { useProjects } from '../../hooks/useProjects.js';

const BLANK = { title: '', fellowName: '', institution: '', area: 'pathogen genomics', status: 'ongoing', startDate: '', students: 0, dataset: '', description: '', tags: '' };

export default function ProjectsPanel({ showToast }) {
  const { projects, addProject, updateProject, removeProject } = useProjects();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(BLANK);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter(p => {
      const mQ = !q || p.title.toLowerCase().includes(q) || (p.fellowName || '').toLowerCase().includes(q);
      const mS = !statusFilter || p.status === statusFilter;
      return mQ && mS;
    });
  }, [projects, search, statusFilter]);

  function openAdd() { setEditId(null); setForm(BLANK); setModalOpen(true); }
  function openEdit(p) {
    setEditId(p.id);
    setForm({ title: p.title || '', fellowName: p.fellowName || '', institution: p.institution || '', area: p.area || 'pathogen genomics', status: p.status || 'ongoing', startDate: p.startDate || '', students: p.students || 0, dataset: p.dataset || '', description: p.description || '', tags: (p.tags || []).join(', ') });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.title.trim()) { showToast('Title is required', 'error'); return; }
    const data = { ...form, students: +form.students || 0, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (editId) { updateProject(editId, data); showToast('Project updated', 'success'); }
    else { addProject(data); showToast('Project added', 'success'); }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!confirm('Delete this project?')) return;
    removeProject(id);
    showToast('Project deleted');
  }

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const STATUS_BADGE = { ongoing: 'badge-green', completed: 'badge-blue', planned: 'badge-amber' };

  return (
    <div className="panel active">
      <div className="table-card">
        <div className="table-header">
          <h3>Research Projects</h3>
          <div className="filter-bar">
            <input className="filter-input" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="planned">Planned</option>
            </select>
            <button className="btn btn-primary" onClick={openAdd}>+ Add Project</button>
          </div>
        </div>

        {filtered.length === 0
          ? <EmptyState title="No projects found" />
          : (
            <table className="tbl">
              <thead><tr><th>Project Title</th><th>Lead Fellow</th><th>Area</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td><div style={{ fontWeight: 500, fontSize: 13.5, maxWidth: 250 }}>{p.title}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{p.startDate || ''}</div></td>
                    <td><div style={{ fontSize: 13 }}>{p.fellowName || '—'}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{p.institution || ''}</div></td>
                    <td><span className="badge badge-purple">{p.area || '—'}</span></td>
                    <td style={{ fontSize: 13 }}>{p.students || 0} students</td>
                    <td><span className={`badge ${STATUS_BADGE[p.status] || 'badge-gray'}`}>{p.status}</span></td>
                    <td>
                      <div className="tbl-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
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
        <div className="modal-head"><h2>{editId ? 'Edit Project' : 'Add Research Project'}</h2><button className="modal-close" onClick={() => setModalOpen(false)}>✕</button></div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-section">Project Details</div>
            <div className="fg form-full"><label>Project Title *</label><input value={form.title} onChange={set('title')} placeholder="AMR Gene Profiling in Lagos Teaching Hospitals" /></div>
            <div className="fg"><label>Lead Fellow Name</label><input value={form.fellowName} onChange={set('fellowName')} placeholder="Dr. Adaeze Okonkwo" /></div>
            <div className="fg"><label>Institution</label><input value={form.institution} onChange={set('institution')} placeholder="University of Lagos" /></div>
            <div className="fg"><label>Research Area</label>
              <select value={form.area} onChange={set('area')}>
                <option value="pathogen genomics">Pathogen Genomics</option>
                <option value="cancer genomics">Cancer Genomics</option>
                <option value="microbiome">Microbiome Research</option>
                <option value="computational biology">Computational Biology</option>
                <option value="bioinformatics">Bioinformatics</option>
              </select>
            </div>
            <div className="fg"><label>Status</label>
              <select value={form.status} onChange={set('status')}>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="planned">Planned</option>
              </select>
            </div>
            <div className="fg"><label>Start Date (YYYY-MM)</label><input value={form.startDate} onChange={set('startDate')} placeholder="2025-01" /></div>
            <div className="fg"><label>Number of Students</label><input type="number" min="0" value={form.students} onChange={set('students')} /></div>
            <div className="fg"><label>Dataset Used</label><input value={form.dataset} onChange={set('dataset')} placeholder="NCBI SRA + local hospital isolates" /></div>
            <div className="fg form-full"><label>Project Description</label><textarea rows="3" value={form.description} onChange={set('description')} /></div>
            <div className="fg form-full"><label>Tags (comma-separated)</label><input value={form.tags} onChange={set('tags')} placeholder="AMR, WGS, Clinical" /></div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Project</button>
        </div>
      </Modal>
    </div>
  );
}
