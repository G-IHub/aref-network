import PageHeader from '../components/ui/PageHeader.jsx';

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About the Framework"
        title="What is"
        titleEm="AREF?"
        desc="The Academic Research Enablement Framework is a selective research architecture network designed to advance structured, publication-oriented genomic and bioinformatics research across institutions."
      />

      <section>
        <div className="section">
          <div className="about-intro-grid">
            <div>
              <div className="section-label">Our Mission</div>
              <div className="section-title">Strengthening the Architecture Behind Academic Research</div>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 300 }}>
                AREF is built on the belief that structured research architecture, peer connection, and long-term research thinking can transform what is possible within academic institutions — particularly in the growing field of genomics and computational biology across Africa and the Global South.
              </p>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, fontWeight: 300 }}>
                Your selection into AREF is recognition of your research potential and commitment. The framework strengthens the architecture behind your research — it does not do the research for you or your students.
              </p>
            </div>
            <div className="about-quote">
              <div className="about-quote-text">The work you do within this framework contributes not only to your institution but to the broader advancement of genomics research across Africa and the Global South.</div>
              <div className="about-quote-attr">— Program Director, AREF · Genomac Institute Inc.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="full-divider"></div>

      <section style={{ background: 'var(--cream-dark)', padding: '5rem 0' }}>
        <div className="section">
          <div className="section-label">Scope & Expectations</div>
          <div className="section-title">What AREF Is — and Is Not</div>
          <p className="section-lead">To set the right expectations from the outset, it is important to clarify what AREF does and does not represent.</p>
          <div className="what-grid">
            <div>
              <div className="what-col-head yes">AREF is</div>
              {['A research architecture and enablement framework','A selective academic research network','A structured research track allocation system','A publication-oriented support system','A long-term research leadership initiative'].map(item => (
                <div key={item} className="what-item">
                  <div className="wi wi-y"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  {item}
                </div>
              ))}
            </div>
            <div>
              <div className="what-col-head no">AREF is not</div>
              {['A training course or academic program','A financial grant or funding scheme','A thesis writing or editing service','A consultancy or commercial service','A substitute for institutional supervision'].map(item => (
                <div key={item} className="what-item">
                  <div className="wi wi-n"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 3l4 4M7 3l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section">
          <div className="section-label">Fellow Status</div>
          <div className="section-title">Your AREF Research Fellow Designation</div>
          <p className="section-lead">From the date of your acceptance, you carry a formal designation that signifies competitive selection into a structured research network.</p>
          <div style={{ marginTop: '2.5rem' }}>
            <div className="designation-box">
              <div className="desig-badge">AREF Research Fellow</div>
              <div className="desig-title">Academic Research Enablement Framework</div>
              <div className="desig-sub">Genomac Institute Inc. — Formally Allocated</div>
              <div className="desig-uses">
                {['LinkedIn Profile','Academic CV','Grant Applications','Institutional Biography','Conference Profiles','Research Proposals'].map(u => (
                  <span key={u} className="desig-use">{u}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="full-divider"></div>

      <section className="dark-section">
        <div className="section">
          <div className="section-label">Academic Standards</div>
          <div className="section-title">Non-Negotiable Integrity Principles</div>
          <p className="section-lead">AREF operates under binding academic integrity standards. All Fellows are held to these throughout their allocation cycle.</p>
          <div className="integrity-grid">
            {[
              { title: 'Authorship Transparency', desc: 'All research outputs must correctly attribute authorship to the individuals who genuinely contributed to the work.', icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>, extra: <circle cx="9" cy="7" r="4"/> },
              { title: 'Research Ethics Compliance', desc: 'All research must comply with your institution\'s ethical review processes and relevant national standards.', icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
              { title: 'Data Integrity', desc: 'All datasets must be appropriately sourced, credited, and handled in accordance with applicable data use agreements.' },
              { title: 'Academic Independence', desc: 'AREF supports structure — it does not write, produce, or fabricate research. Intellectual ownership remains entirely yours.' },
              { title: 'No Misrepresentation', desc: 'You must not misrepresent your AREF status, research track scope, or the nature of AREF support in any communication.' },
              { title: 'Conduct Within the Network', desc: 'Engage respectfully; maintain confidentiality of privileged discussions and unpublished research shared within the network.' },
            ].map(({ title, desc }) => (
              <div key={title} className="int-card">
                <div className="int-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9973e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="int-title">{title}</div>
                <div className="int-desc">{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem' }}>
            <div className="section-label">Grounds for Withdrawal</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginBottom: '0.75rem' }}>
              AREF reserves the right to withdraw allocation in cases of:
            </div>
            <div className="grounds-grid">
              {['Academic misconduct or ethical violation','Misrepresentation of AREF status or research activities','Extended inactivity without communication','Failure to comply with the Academic Integrity Standards'].map(g => (
                <div key={g} className="ground-card">
                  <div className="ground-icon">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 3l4 4M7 3l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <div className="ground-text">{g}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
