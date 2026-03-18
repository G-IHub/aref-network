import { useState, useMemo } from 'react';
import PageHeader from '../components/ui/PageHeader.jsx';
import SubNav from '../components/ui/SubNav.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { useProjects } from '../hooks/useProjects.js';

export default function Projects() {
  const { projects } = useProjects();
  const [query, setQuery] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return projects.filter(p => {
      const mQ = !q || p.title.toLowerCase().includes(q) || (p.fellowName || '').toLowerCase().includes(q) || (p.dataset || '').toLowerCase().includes(q);
      const mA = !areaFilter || (p.area || '').toLowerCase().includes(areaFilter);
      const mS = !statusFilter || p.status === statusFilter;
      return mQ && mA && mS;
    });
  }, [projects, query, areaFilter, statusFilter]);

  return (
    <>
      <PageHeader
        eyebrow="Research Tracks"
        title="Ongoing"
        titleEm="Research Projects"
        desc="Active research projects being conducted by AREF Fellows across genomics, bioinformatics, and computational biology domains."
      />

      <SubNav />

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search projects by title, fellow, or dataset…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select className="filter-select" value={areaFilter} onChange={e => setAreaFilter(e.target.value)}>
          <option value="">All Research Areas</option>
          <option value="pathogen genomics">Pathogen Genomics</option>
          <option value="cancer genomics">Cancer Genomics</option>
          <option value="microbiome">Microbiome Research</option>
          <option value="computational biology">Computational Biology</option>
          <option value="bioinformatics">Bioinformatics</option>
        </select>
        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="planned">Planned</option>
        </select>
        <div className="result-count">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</div>
      </div>

      <div className="projects-grid">
        {filtered.length > 0
          ? filtered.map(p => <ProjectCard key={p.id} project={p} />)
          : <EmptyState title="No projects found" desc="Try adjusting your filters." />
        }
      </div>
    </>
  );
}
