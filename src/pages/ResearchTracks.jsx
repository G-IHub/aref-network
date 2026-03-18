import PageHeader from '../components/ui/PageHeader.jsx';
import SubNav from '../components/ui/SubNav.jsx';

export default function ResearchTracks() {
  return (
    <>
      <PageHeader
        eyebrow="Research Architecture"
        title="AREF"
        titleEm="Research Tracks"
        desc="Your research track is the operational core of your participation. It is not a single project — it is a structured, multi-year research program built around a defined theme and supported by student cohorts at multiple academic levels."
      />

      <SubNav />

      <section>
        <div className="section">
          <div className="section-label">Track Architecture</div>
          <div className="section-title">Seven Core Components of a Research Track</div>
          <p className="section-lead">A well-structured AREF Research Track contains the following components. You will be guided to develop and refine each during your onboarding.</p>
          <div className="components-grid">
            {[
              ['1','Research Theme Title','A clear, concise title for your research direction that captures the thematic scope of your track.'],
              ['2','Biological or Disease Focus','The primary scientific problem or question your track addresses — from pathogen genomics to cancer biology or population genetics.'],
              ['3','Dataset Strategy','The public or institutional genomic datasets relevant to your theme, selected and structured for meaningful analytical use.'],
              ['4','Analytical Framework','The computational and bioinformatics methodology underpinning your research outputs and student cohort work.'],
              ['5','Student Layering Model','How undergraduate, MSc, and PhD students will contribute at different levels, building progressively on one another\'s work.'],
              ['6','Publication Pathway','Your planned research outputs, target journals, and the structured timeline from dataset analysis to submission.'],
              ['7','Long-Term Expansion Vision','How your track will grow, deepen, and generate new research questions across a 2-to-5-year horizon, including new student cohorts and sub-tracks.', true],
            ].map(([num, title, desc, fullWidth]) => (
              <div key={num} className="comp-card" style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
                <div className="comp-num">{num}</div>
                <div>
                  <div className="comp-title">{title}</div>
                  <div className="comp-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="full-divider"></div>

      <section style={{ background: 'var(--cream-dark)', padding: '5rem 0' }}>
        <div className="section">
          <div className="section-label">Student Layering Model</div>
          <div className="section-title">Three-Tier Research Contribution Architecture</div>
          <p className="section-lead">One of the most powerful aspects of the AREF model is that your track can accommodate students at multiple academic levels simultaneously, with each level contributing progressively to the overall research direction.</p>
          <div className="layering-cards">
            <div className="layer-card">
              <div className="layer-header ug">
                <div className="layer-level ug">Undergraduate</div>
                <div className="layer-name">Foundation Layer</div>
              </div>
              <div className="layer-body">
                <div className="layer-role">Dataset explorer &amp; question framer</div>
                <div className="layer-desc">Undergraduate students form the foundation of your research track. They explore the dataset, frame initial research questions, and conduct basic descriptive analyses under your direct supervision.</div>
                <div className="layer-output">Output: Initial results, dataset familiarity, question definition</div>
              </div>
            </div>

            <div className="layer-card">
              <div className="layer-header msc">
                <div className="layer-level msc">Master's (MSc)</div>
                <div className="layer-name">Analytical Depth Layer</div>
              </div>
              <div className="layer-body">
                <div className="layer-role">Comparative investigator</div>
                <div className="layer-desc">MSc students build on undergraduate work, conducting comparative or deeper investigations with more rigorous methodology. Their work often forms the basis for publication contributions within your track.</div>
                <div className="layer-output">Output: Stronger methodology, comparative outputs, publication contribution</div>
              </div>
            </div>

            <div className="layer-card">
              <div className="layer-header phd">
                <div className="layer-level phd">Doctoral (PhD)</div>
                <div className="layer-name">Advanced Research Layer</div>
              </div>
              <div className="layer-body">
                <div className="layer-role">Novel contributor &amp; innovator</div>
                <div className="layer-desc">Doctoral students lead novel contributions and methodological innovation within the track. They are expected to generate publication-grade findings that shape the long-term direction of your research program.</div>
                <div className="layer-output">Output: Publication-grade findings, long-term track direction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section">
          <div className="section-label">Track Lifecycle</div>
          <div className="section-title">How Your Research Track Progresses</div>
          <p className="section-lead">Your research track is expected to move through the following stages during your allocation cycle and beyond.</p>
          <div className="lifecycle-steps">
            {[
              ['1','Ideation & Theme','Define the core direction and align to relevant datasets'],
              ['2','Track Design','Complete the Research Blueprint with student layering and output plan'],
              ['3','Cohort Activation','Align students to the track and initiate their research projects'],
              ['4','Data & Analysis','Dataset access, computational analysis, and interpretation'],
              ['5','Manuscript','Structure findings into publication-ready outputs'],
              ['6','Submission','Submit to target journals with AREF pathway guidance'],
              ['7','Dissemination','Present at AREF showcases, conferences, and in the network'],
              ['8','Expansion','Generate new questions, add cohorts, deepen the research direction'],
            ].map(([num, title, desc]) => (
              <div key={num} className="ls-card">
                <div className="ls-num">{num}</div>
                <div className="ls-title">{title}</div>
                <div className="ls-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="full-divider"></div>

      <section className="dark-section">
        <div className="section">
          <div className="section-label">Research Domains</div>
          <div className="section-title">Thematic Areas Within the AREF Network</div>
          <p className="section-lead">Research tracks in the AREF network are organised around the following thematic domains.</p>
          <div className="domains-grid">
            {[
              { title: 'Pathogen Genomics', desc: 'Whole-genome sequencing of bacteria, viruses and parasites. AMR profiling, phylogenomics, and genomic epidemiology of infectious disease.' },
              { title: 'Microbiome Research', desc: '16S rRNA and metagenomic analyses of gut, oral, soil, and environmental microbiomes. Diversity analysis and host-microbiome interactions.' },
              { title: 'Cancer Genomics', desc: 'Somatic mutation landscapes, hereditary cancer risk variants, and transcriptomic profiling of African-ancestry cancer cohorts.' },
              { title: 'Computational Biology', desc: 'GWAS, population genomics, pharmacogenomics, and structural variant analysis using public African-ancestry genomic reference datasets.' },
            ].map(({ title, desc }) => (
              <div key={title} className="domain-card">
                <div className="domain-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div className="domain-title">{title}</div>
                <div className="domain-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
