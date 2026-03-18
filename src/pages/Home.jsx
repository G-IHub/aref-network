import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow"><div className="hero-eyebrow-dot"></div>Academic Research Enablement Framework</div>
            <h1>Advancing <em>Genomics</em> Research Across Institutions</h1>
            <p className="hero-lead">AREF is a selective research architecture network that supports approved academic supervisors in developing structured, scalable, and publication-oriented genomic and bioinformatics research tracks.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate('/apply')}>Apply to AREF</button>
              <button className="btn-outline" onClick={() => navigate('/about')}>Learn More</button>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-stats">
              <div className="hero-stat"><div className="hero-stat-num">12</div><div className="hero-stat-label">Month Allocation Cycle</div></div>
              <div className="hero-stat"><div className="hero-stat-num">3</div><div className="hero-stat-label">Academic Levels</div></div>
              <div className="hero-stat"><div className="hero-stat-num">14</div><div className="hero-stat-label">Fellow Benefits</div></div>
              <div className="hero-stat"><div className="hero-stat-num">4+</div><div className="hero-stat-label">Annual Events</div></div>
            </div>
            <div className="hero-badge">
              <div className="hero-badge-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="hero-badge-copy">
                <strong>AREF Research Fellow Designation</strong>
                Recognised on LinkedIn, CVs, grant applications &amp; institutional profiles globally
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS AREF */}
      <section>
        <div className="section">
          <div className="section-label">What is AREF</div>
          <div className="section-title">A Framework Built for Research Leaders</div>
          <p className="section-lead">AREF is not a training course, financial grant, or thesis writing service. It is a structured research architecture designed to strengthen the scaffolding behind your academic work.</p>
          <div className="what-grid">
            <div>
              <div className="what-col-head yes-head">AREF is</div>
              {['A research architecture and enablement framework','A selective academic research network','A structured research track allocation system','A publication-oriented support system','A long-term research leadership initiative'].map(item => (
                <div key={item} className="what-item">
                  <div className="wi-icon wi-yes"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  {item}
                </div>
              ))}
            </div>
            <div>
              <div className="what-col-head no-head">AREF is not</div>
              {['A training course or academic program','A financial grant or funding scheme','A thesis writing or editing service','A consultancy or commercial service','A substitute for institutional supervision'].map(item => (
                <div key={item} className="what-item">
                  <div className="wi-icon wi-no"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 3l4 4M7 3l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="full-divider"></div>

      {/* BENEFITS */}
      <section className="dark-section">
        <div className="section">
          <div className="section-label">Fellow Benefits</div>
          <div className="section-title">What You Receive as an AREF Fellow</div>
          <p className="section-lead">Fourteen formal entitlements spanning recognition, infrastructure, community and long-term research support.</p>
          <div className="benefits-grid">
            {[
              ['01','Certificate of Research Track Allocation','Formal institutional certificate confirming your Fellow status, suitable for academic portfolio inclusion.'],
              ['02','AREF Fellow Digital Badge','Professional badge for LinkedIn, email signatures, and institutional profiles.'],
              ['03','Research Network Directory Listing','Your name, institution, and research track publicly listed in the AREF Directory.'],
              ['04','Structured Research Architecture Support','Frameworks covering research design, dataset strategy, analytical workflow mapping, and publication planning.'],
              ['05','Public Genomic Dataset Strategy','Guided access to public genomic datasets, enabling meaningful research even with limited wet-lab infrastructure.'],
              ['06','AREF Research Network Membership','Full membership in a growing community of academic supervisors advancing genomics research.'],
              ['07-10','Network Events & Forums','Monthly forums, bi-monthly roundtables, quarterly showcases, and the Annual AREF Summit.'],
              ['11-12','Research Spotlight & Annual Report','Eligibility for the Research Spotlight feature and the widely circulated Annual Research Report.'],
              ['13','Priority in Future Cycles','High-performing Fellows receive priority for renewed allocation and early access to future initiatives.'],
              ['14','Early Access to Omicsboard',"First access to Genomac's research execution platform — digital infrastructure to scale your research track."],
            ].map(([num, title, desc]) => (
              <div key={num} className="card-dark benefit-card">
                <div className="benefit-num">{num}</div>
                <div className="benefit-title">{title}</div>
                <div className="benefit-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK */}
      <section>
        <div className="section">
          <div className="section-label">Research Tracks</div>
          <div className="section-title">The Architecture of Your Research Track</div>
          <p className="section-lead">A structured, multi-year program built around a defined theme and supported by student cohorts at multiple academic levels.</p>
          <div className="track-grid">
            <div className="track-steps" id="ts">
              {[
                ['1','Research Theme Title','A clear, concise title for your defined genomics or computational biology direction.'],
                ['2','Biological or Disease Focus','The primary scientific problem your track addresses — from pathogen genomics to cancer biology.'],
                ['3','Dataset Strategy','Public or institutional genomic datasets relevant to your theme, structured for meaningful use.'],
                ['4','Analytical Framework','The computational and bioinformatics approach underpinning your research outputs.'],
                ['5','Student Layering Model','How UG, MSc, and PhD students contribute at different levels, building progressively.'],
                ['6','Publication Pathway','Planned outputs, target journals, and the timeline from analysis to submission.'],
                ['7','Long-Term Expansion Vision','How your track will grow and generate new questions across 2-5 years.'],
              ].map(([num, title, desc]) => (
                <div key={num} className="track-step">
                  <div className="ts-num">{num}</div>
                  <div><div className="ts-title">{title}</div><div className="ts-desc">{desc}</div></div>
                </div>
              ))}
            </div>
            <div className="track-visual">
              <div className="tv-label">Student Layering Model</div>
              <div className="tv-title">Three-Tier Research Architecture</div>
              <table className="layering-table">
                <thead><tr><th>Level</th><th>Role</th><th>Contribution</th></tr></thead>
                <tbody>
                  <tr><td><span className="badge lvl-ug">Undergraduate</span></td><td>Foundation layer — dataset exploration, question framing</td><td>Initial results, dataset familiarity</td></tr>
                  <tr><td><span className="badge lvl-msc">Master's</span></td><td>Analytical depth — builds on UG work, comparative investigations</td><td>Stronger methodology, publication contribution</td></tr>
                  <tr><td><span className="badge lvl-phd">Doctoral</span></td><td>Advanced — leads novel contributions, methodological innovation</td><td>Publication-grade findings, track direction</td></tr>
                </tbody>
              </table>
              <div className="track-note">
                <div className="track-note-label">Track Lifecycle</div>
                <div className="track-note-text">Ideation → Design → Cohort Activation → Analysis → Manuscript → Submission → Dissemination → Expansion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="full-divider"></div>

      {/* NETWORK */}
      <section style={{ background: 'var(--cream-dark)', padding: '5rem 0' }}>
        <div className="section">
          <div className="section-label">Network Engagement</div>
          <div className="section-title">An Intellectually Alive Community</div>
          <p className="section-lead">AREF is designed to be more than a passive listing. Your participation makes the community valuable for all members.</p>
          <div className="cal-grid">
            <div className="cal-card"><div className="cal-freq">Monthly</div><div className="cal-title">Research Forums</div><div className="cal-desc">Share findings, discuss datasets, and explore collaboration opportunities with fellows.</div></div>
            <div className="cal-card"><div className="cal-freq">Bi-Monthly</div><div className="cal-title">Thematic Roundtables</div><div className="cal-desc">Domain-specific discussions across pathogen genomics, microbiome research, cancer genomics, and computational biology.</div></div>
            <div className="cal-card"><div className="cal-freq">Quarterly</div><div className="cal-title">Research Showcases</div><div className="cal-desc">Present research progress to the wider network and build visibility for your institution.</div></div>
            <div className="cal-card flagship"><div className="cal-freq">Annual</div><div className="cal-title">AREF Summit</div><div className="cal-desc">The flagship event — keynotes, research presentations, awards, and collaboration sessions. All Fellows attend.</div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <h2>Ready to Join the AREF Network?</h2>
        <p>Your selection recognises your research potential, supervisory commitment, and academic ambition. The framework is designed to strengthen the architecture behind your research.</p>
        <div className="cta-actions">
          <button className="btn-primary" onClick={() => navigate('/apply')}>Apply to AREF</button>
          <button className="btn-outline" onClick={() => navigate('/fellows')}>Meet the Fellows</button>
        </div>
      </section>
    </>
  );
}
