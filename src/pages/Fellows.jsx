import { useState, useMemo } from 'react';
import PageHeader from '../components/ui/PageHeader.jsx';
import FellowCard from '../components/fellows/FellowCard.jsx';
import FellowModal from '../components/fellows/FellowModal.jsx';
import Modal from '../components/ui/Modal.jsx';
import { useFellows } from '../hooks/useFellows.js';

export default function Fellows() {
  const { fellows } = useFellows();
  const [query, setQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [selectedFellow, setSelectedFellow] = useState(null);

  const activeFellows = useMemo(
    () => fellows.filter(f => f.status === 'active'),
    [fellows]
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return activeFellows.filter(f => {
      const mQ = !q || f.name.toLowerCase().includes(q) || (f.institution || '').toLowerCase().includes(q) || (f.trackTitle || '').toLowerCase().includes(q) || (f.tags || []).some(t => t.toLowerCase().includes(q));
      const mL = !locationFilter || (f.country || '').toLowerCase() === locationFilter;
      const mA = !areaFilter || (f.area || '').toLowerCase().includes(areaFilter);
      return mQ && mL && mA;
    });
  }, [activeFellows, query, locationFilter, areaFilter]);

  return (
    <>
      <PageHeader
        eyebrow="AREF Research Network"
        title="Meet Our"
        titleEm="Research Fellows"
        desc="A selective community of academic supervisors advancing genomics, bioinformatics, and computational biology research across institutions in Africa and the Global South."
      />

      <div className="fellows-controls">
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9990b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, institution, or research area…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <select className="filter-select" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          <option value="nigeria">Nigeria</option>
          <option value="ghana">Ghana</option>
          <option value="kenya">Kenya</option>
          <option value="south africa">South Africa</option>
          <option value="ethiopia">Ethiopia</option>
          <option value="cameroon">Cameroon</option>
        </select>
        <select className="filter-select" value={areaFilter} onChange={e => setAreaFilter(e.target.value)}>
          <option value="">All Research Areas</option>
          <option value="pathogen genomics">Pathogen Genomics</option>
          <option value="cancer genomics">Cancer Genomics</option>
          <option value="microbiome">Microbiome Research</option>
          <option value="computational biology">Computational Biology</option>
          <option value="bioinformatics">Bioinformatics</option>
        </select>
        <div className="fellows-count">
          Showing {filtered.length} fellow{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="fellows-grid">
        {filtered.length > 0
          ? filtered.map(f => (
              <FellowCard key={f.id} fellow={f} onClick={() => setSelectedFellow(f)} />
            ))
          : <div className="no-results"><h3>No fellows found</h3><p>Try adjusting your search or filters.</p></div>
        }
      </div>

      <Modal open={!!selectedFellow} onClose={() => setSelectedFellow(null)}>
        <FellowModal fellow={selectedFellow} onClose={() => setSelectedFellow(null)} />
      </Modal>
    </>
  );
}
