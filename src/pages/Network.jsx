import PageHeader from '../components/ui/PageHeader.jsx';

export default function Network() {
  return (
    <>
      <PageHeader
        eyebrow="AREF Research Network"
        title="Network &"
        titleEm="Events"
        desc="AREF is designed to be intellectually alive — not a passive listing. Your participation in network activities is what makes the community valuable for all members, including yourself."
      />

      <section>
        <div className="section">
          <div className="section-label">Engagement Calendar</div>
          <div className="section-title">Network Activities Throughout the Year</div>
          <p className="section-lead">From monthly research exchanges to the flagship Annual Summit, AREF runs a structured programme of intellectual engagement for all Fellows.</p>

          <div className="events-grid">
            <div className="event-card">
              <div className="event-card-top">
                <div className="event-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div><div className="event-freq">Monthly</div><div className="event-name">Research Forums</div></div>
              </div>
              <div className="event-body">
                <p className="event-desc">Monthly sessions where Fellows share findings, discuss datasets, exchange analytical approaches, and explore collaboration opportunities. Expected participation for all active Fellows.</p>
                <div className="event-meta"><span className="event-tag">All Fellows</span><span className="event-tag">Expected Attendance</span><span className="event-tag">Virtual</span></div>
              </div>
            </div>

            <div className="event-card">
              <div className="event-card-top">
                <div className="event-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85"/>
                  </svg>
                </div>
                <div><div className="event-freq">Bi-Monthly</div><div className="event-name">Thematic Roundtables</div></div>
              </div>
              <div className="event-body">
                <p className="event-desc">Domain-specific discussions organised around pathogen genomics, microbiome research, cancer genomics, and computational biology. Fellows are invited based on research area alignment.</p>
                <div className="event-meta"><span className="event-tag">By Domain</span><span className="event-tag">Invited</span><span className="event-tag">Deep Dive Format</span></div>
              </div>
            </div>

            <div className="event-card">
              <div className="event-card-top">
                <div className="event-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div><div className="event-freq">Quarterly</div><div className="event-name">Research Showcases</div></div>
              </div>
              <div className="event-body">
                <p className="event-desc">Quarterly events where selected Fellows present research progress and findings to the wider network, building visibility for their work and their institutions. Participation is by selection.</p>
                <div className="event-meta"><span className="event-tag">By Selection</span><span className="event-tag">Presentation Format</span><span className="event-tag">Visibility Building</span></div>
              </div>
            </div>

            <div className="event-card">
              <div className="event-card-top summit">
                <div className="event-icon summit-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div><div className="event-freq gold">Annual</div><div className="event-name">AREF Summit</div></div>
              </div>
              <div className="event-body">
                <p className="event-desc">The flagship event of the AREF network, featuring keynote addresses from leading genomics researchers, Fellow research presentations, recognition awards, and collaboration sessions. All Fellows are expected to attend.</p>
                <div className="event-meta"><span className="event-tag">All Fellows</span><span className="event-tag">Flagship Event</span><span className="event-tag">Awards Ceremony</span><span className="event-tag">In-Person</span></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>Full Engagement Calendar</div>
            <table className="calendar-table">
              <thead>
                <tr><th>Activity</th><th>Purpose</th><th>Frequency</th><th>Participation</th></tr>
              </thead>
              <tbody>
                <tr><td>Monthly Research Forum</td><td>Research exchange &amp; presentations</td><td>Monthly</td><td><span className="participation-badge part-expected">Expected</span></td></tr>
                <tr><td>Thematic Roundtable</td><td>Domain-specific discussions</td><td>Bi-Monthly</td><td><span className="participation-badge part-invited">Invited</span></td></tr>
                <tr><td>Quarterly Research Showcase</td><td>Research progress presentations</td><td>Quarterly</td><td><span className="participation-badge part-nomination">By Selection</span></td></tr>
                <tr><td>Annual AREF Summit</td><td>Flagship network event</td><td>Annual</td><td><span className="participation-badge part-all">All Fellows</span></td></tr>
                <tr><td>Research Spotlight Feature</td><td>Individual visibility</td><td>Periodic</td><td><span className="participation-badge part-nomination">By Nomination</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="full-divider"></div>

      <section style={{ background: 'var(--cream-dark)', padding: '5rem 0' }}>
        <div className="section">
          <div className="section-label">Allocation Cycle Milestones</div>
          <div className="section-title">Your Activity Expectations Across 12 Months</div>
          <p className="section-lead">The following milestones define your activity expectations across the 12-month allocation cycle from the date of your acceptance.</p>
          <div className="milestones-grid">
            {[
              ['M1','Attend AREF Induction & Alignment Briefing','Within 2 weeks of acceptance'],
              ['M2','Submit Research Track Blueprint','Within 4 weeks of acceptance'],
              ['M3','Activate First Student Cohort','Within 6–8 weeks of acceptance'],
              ['M4','Participate in at Least 4 Monthly Research Forums','Across the full cycle'],
              ['M5','Submit Research Progress Update','Mid-cycle (Month 6)'],
              ['M6','Attend or Present at Annual AREF Summit','Annual event'],
              ['M7','Cycle Review & Renewal Application','Month 10–11'],
            ].map(([tag, title, when]) => (
              <div key={tag} className="ms-card">
                <div className="ms-tag">{tag}</div>
                <div className="ms-title">{title}</div>
                <div className="ms-when">{when}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="section">
          <div className="section-label">Colleague Nominations</div>
          <div className="section-title">Grow the Network</div>
          <p className="section-lead">As an AREF Research Fellow, you may nominate academic colleagues for consideration in the network. This is a peer recommendation mechanism, not a referral incentive program.</p>
          <div className="nomination-box">
            <div>
              <div className="nom-title">Nominating Your Colleagues</div>
              <div className="nom-desc">Nominated colleagues receive priority review, but selection remains competitive and merit-based. Nominations that result in successful allocations may enhance your standing within the network and priority consideration in future cycles. You may nominate up to three colleagues per allocation cycle.</div>
            </div>
            <div className="nom-stat">
              <div className="nom-num">3</div>
              <div className="nom-label">Nominations per cycle</div>
            </div>
          </div>
        </div>
      </section>

      <div className="full-divider"></div>

      <section className="dark-section">
        <div className="section">
          <div className="section-label">Cycle Renewal</div>
          <div className="section-title">How Your Allocation is Reviewed</div>
          <p className="section-lead">Renewal is not automatic — it reflects continued alignment with AREF standards. Performance is reviewed based on the following criteria.</p>
          <div className="renewal-grid">
            {['Evidence of active research track development','Student cohort activation and engagement','Network participation and contribution','Research outputs generated or in progress','Ethical compliance and professional conduct'].map(text => (
              <div key={text} className="renewal-card">
                <div className="renewal-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--purple-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div className="renewal-text">{text}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', background: 'rgba(200,151,61,0.12)', border: '1px solid rgba(200,151,61,0.25)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--gold-light)' }}>Priority Fellow Upgrade:</strong> High-performing Fellows may be upgraded to Priority AREF Research Fellow status, receiving priority consideration for all future Genomac Institute initiatives and early access to new programmes.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
