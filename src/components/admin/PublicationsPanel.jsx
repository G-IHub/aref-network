import { useState, useMemo } from 'react';
import Modal from '../ui/Modal.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import { usePublications } from '../../hooks/usePublications.js';

const BLANK = { title: '', authors: '', journal: '', year: '', doi: '', type: 'Original Article', area: 'pathogen genomics', open: 'true', fellowName: '' };

export default function PublicationsPanel({ showToast }) {
  const { publications, addPublication, updatePublication, removePublication } = usePublications();
  const [search, setSearch] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(BLANK);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return publications.filter(p => {
      const mQ = !q || p.title.toLowerCase().includes(q) || (p.authors || '').toLowerCase().includes(q) || (p.journal || '').toLowerCase().includes(q);
      const mA = !areaFilter || (p.area || '').toLowerCase().includes(areaFilter);
      return mQ && mA;
    });
  }, [publications, search, areaFilter]);

  function openAdd() { setEditId(null); setForm(BLANK); setModalOpen(true); }
  function openEdit(p) {
    setEditId(p.id);
    setForm({ title: p.title || '', authors: p.authors || '', journal: p.journal || '', year: p.year || '', doi: p.doi || '', type: p.type || 'Original Article', area: p.area || 'pathogen genomics', open: (p.open === true || p.open === 'true') ? 'true' : 'false', fellowName: p.fellowName || '' });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.title.trim()) { showToast('Title is required', 'error'); return; }
    const data = { ...form, open: form.open === 'true' };
    if (editId) { updatePublication(editId, data); showToast('Publication updated', 'success'); }
    else { addPublication(data); showToast('Publication added', 'success'); }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!confirm('Delete this publication?')) return;
    removePublication(id);
    showToast('Publication deleted');
  }

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const isOA = (p) => p.open === true || p.open === 'true';

  return (
    <div className="panel active">
      <div className="table-card">
        <div className="table-header">
          <h3>Publications</h3>
          <div className="filter-bar">
            <input className="filter-input" placeholder="Search title, authors…" value={search} onChange={e => setSearch(e.target.value)} />
            <select className="filter-select" value={areaFilter} onChange={e => setAreaFilter(e.target.value)}>
              <option value="">All Areas</option>
              <option value="pathogen genomics">Pathogen Genomics</option>
              <option value="cancer genomics">Cancer Genomics</option>
              <option value="microbiome">Microbiome</option>
              <option value="computational biology">Computational Biology</option>
            </select>
            <button className="btn btn-primary" onClick={openAdd}>+ Add Publication</button>
          </div>
        </div>

        {filtered.length === 0
          ? <EmptyState title="No publications found" />
          : filtered.map(p => (
            <div key={p.id} className="pub-row">
              <div className="pub-title">{p.title}</div>
              <div className="pub-meta">
                <span>{p.authors || ''}</span>
                <span style={{ color: 'var(--p500)', fontWeight: 500 }}>{p.journal || ''}</span>
                <span>{p.year || ''}</span>
                <span className="badge badge-purple">{p.type || 'Article'}</span>
                {isOA(p) ? <span className="badge badge-green">Open Access</span> : <span className="badge badge-gray">Subscription</span>}
              </div>
              <div className="pub-actions">
                {p.doi && <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">View DOI</a>}
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="modal-head"><h2>{editId ? 'Edit Publication' : 'Add Publication'}</h2><button className="modal-close" onClick={() => setModalOpen(false)}>✕</button></div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-section">Publication Details</div>
            <div className="fg form-full"><label>Title *</label><input value={form.title} onChange={set('title')} placeholder="Full publication title…" /></div>
            <div className="fg form-full"><label>Authors *</label><input value={form.authors} onChange={set('authors')} placeholder="Okonkwo A, Adeyemi T, Bello S" /></div>
            <div className="fg"><label>Journal *</label><input value={form.journal} onChange={set('journal')} placeholder="Frontiers in Microbiology" /></div>
            <div className="fg"><label>Year</label><input value={form.year} onChange={set('year')} placeholder="2025" /></div>
            <div className="fg"><label>DOI</label><input value={form.doi} onChange={set('doi')} placeholder="10.3389/fmicb.2025.123456" /></div>
            <div className="fg"><label>Type</label>
              <select value={form.type} onChange={set('type')}>
                <option value="Original Article">Original Article</option>
                <option value="Review">Review</option>
                <option value="Short Communication">Short Communication</option>
                <option value="Conference Paper">Conference Paper</option>
                <option value="Book Chapter">Book Chapter</option>
              </select>
            </div>
            <div className="fg"><label>Research Area</label>
              <select value={form.area} onChange={set('area')}>
                <option value="pathogen genomics">Pathogen Genomics</option>
                <option value="cancer genomics">Cancer Genomics</option>
                <option value="microbiome">Microbiome Research</option>
                <option value="computational biology">Computational Biology</option>
                <option value="bioinformatics">Bioinformatics</option>
              </select>
            </div>
            <div className="fg"><label>Open Access?</label>
              <select value={form.open} onChange={set('open')}><option value="true">Yes — Open Access</option><option value="false">No — Subscription</option></select>
            </div>
            <div className="fg"><label>Lead Fellow Name</label><input value={form.fellowName} onChange={set('fellowName')} placeholder="Dr. Adaeze Okonkwo" /></div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Publication</button>
        </div>
      </Modal>
    </div>
  );
}
