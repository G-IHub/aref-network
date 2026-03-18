import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader.jsx';
import { useSubmissions } from '../hooks/useSubmissions.js';

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '', position: '', country: '', institution: '',
  researchArea: '', cohortSize: '', statement: '', referee: '', refereeContact: '', source: '',
  cvFile: '', proposalFile: '',
};

export default function Apply() {
  const navigate = useNavigate();
  const { addSubmission } = useSubmissions();
  const formRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [cvFileName, setCvFileName] = useState('');
  const [proposalFileName, setProposalFileName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  function handleFileChange(field, setFileName) {
    return (e) => {
      const file = e.target.files[0];
      setFileName(file ? '✓ ' + file.name : '');
      setForm(prev => ({ ...prev, [field]: file ? file.name : '' }));
    };
  }

  function handleSubmit() {
    setError('');
    const required = ['firstName','lastName','email','position','country','institution','researchArea','statement'];
    for (const field of required) {
      if (!form[field].trim()) {
        setError('Please fill in all required fields (marked *).');
        return;
      }
    }
    setSubmitting(true);
    setTimeout(() => {
      addSubmission(form);
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <>
      <PageHeader
        eyebrow="Join the AREF Network"
        title="Apply to"
        titleEm="AREF"
        desc="Your application begins with an Expression of Interest. Selection is competitive and merit-based, reviewed by the AREF Steering Committee."
      />

      {/* CRITERIA */}
      <section className="dark-section">
        <div className="section">
          <div className="section-label">Selection Criteria</div>
          <div className="section-title">What We Look For in an AREF Fellow</div>
          <p className="section-lead">Selection is competitive. Your research direction, supervisory capacity, and commitment to structured research development are the primary criteria.</p>
          <div className="criteria-grid">
            {[
              ['Research Direction','A defined focus in genomics, bioinformatics, or computational biology with clear scientific rationale.'],
              ['Supervisory Capacity','Demonstrated or developing capacity to supervise students at UG, MSc, or doctoral levels.'],
              ['Commitment to Structure','Willingness to develop a formal, scalable research track and engage consistently with the AREF network.'],
              ['Publication Ambition','Genuine orientation towards generating research outputs from student cohort work.'],
              ['Academic Integrity','Full commitment to the academic integrity standards required of all AREF Research Fellows.'],
              ['Institutional Affiliation','Active academic affiliation with a recognised institution, with capacity to supervise students formally.'],
            ].map(([title, desc]) => (
              <div key={title} className="crit-card">
                <div className="crit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="crit-title">{title}</div>
                <div className="crit-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM & ONBOARDING */}
      <section>
        <div className="section">
          <div className="apply-grid">
            {/* LEFT: ONBOARDING STEPS */}
            <div>
              <div className="section-label">First Steps</div>
              <div className="section-title">Onboarding Once Accepted</div>
              <p className="section-lead">Your allocation is only fully active once your acceptance is acknowledged and your Research Track Blueprint is submitted.</p>
              <div className="ob-list" style={{ marginTop: '2rem' }}>
                {[
                  ['1','Acknowledge your acceptance letter','Confirm via email using your institutional email address.','Within 5 days of receipt'],
                  ['2','Attend the AREF Induction & Alignment Briefing','Your formal entry into the network. Covers the Research Track concept, student cohort activation, and your first assignment. Not optional.','Within 2 weeks of acceptance'],
                  ['3','Submit your Research Track Blueprint','Complete the template covering Research Theme, Dataset Strategy, Student Layering Model, and Publication Pathway.','Within 4 weeks of acceptance'],
                  ['4','Join the AREF Research Network channel','Connect with fellow network members and receive event invitations.','Upon onboarding'],
                  ['5','Identify and confirm your first student cohort','Align students to your Research Track and initiate their projects.','Within 6–8 weeks'],
                ].map(([num, title, desc, deadline], i) => (
                  <div key={num} className="ob-item" style={i === 4 ? { borderBottom: 'none' } : {}}>
                    <div className="ob-num">{num}</div>
                    <div>
                      <div className="ob-title">{title}</div>
                      <div className="ob-desc">{desc}</div>
                      <span className="ob-deadline">{deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notice-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>
                  <div className="notice-title">Important Notice</div>
                  <div className="notice-desc">Fellows who do not complete onboarding milestones within the stipulated timeframes may have their allocation deferred to the next cycle.</div>
                </div>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="form-card" ref={formRef} id="app-form">
              {!submitted ? (
                <div id="form-main">
                  <div className="form-card-title">Expression of Interest</div>
                  <div className="form-card-sub">Submit your details to begin the AREF application review process. All fields marked * are required.</div>

                  <div className="form-section-label">Personal Information</div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">First Name *</label><input type="text" className="form-input" placeholder="Adaeze" value={form.firstName} onChange={set('firstName')} /></div>
                    <div className="form-group"><label className="form-label">Last Name *</label><input type="text" className="form-input" placeholder="Okonkwo" value={form.lastName} onChange={set('lastName')} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Institutional Email Address *</label><input type="email" className="form-input" placeholder="you@university.edu" value={form.email} onChange={set('email')} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Academic Title / Position *</label><input type="text" className="form-input" placeholder="e.g. Associate Professor" value={form.position} onChange={set('position')} /></div>
                    <div className="form-group"><label className="form-label">Country *</label><input type="text" className="form-input" placeholder="Nigeria" value={form.country} onChange={set('country')} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Institution *</label><input type="text" className="form-input" placeholder="University of Lagos" value={form.institution} onChange={set('institution')} /></div>

                  <div className="form-section-label">Research Profile</div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Research Domain *</label>
                      <select className="form-select" value={form.researchArea} onChange={set('researchArea')}>
                        <option value="">Select area…</option>
                        <option>Pathogen Genomics</option>
                        <option>Cancer Genomics</option>
                        <option>Microbiome Research</option>
                        <option>Computational Biology</option>
                        <option>Bioinformatics</option>
                        <option>Population Genomics</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Expected Student Cohort Size</label>
                      <select className="form-select" value={form.cohortSize} onChange={set('cohortSize')}>
                        <option value="">Select…</option>
                        <option>1–3 students</option>
                        <option>4–6 students</option>
                        <option>7–10 students</option>
                        <option>10+ students</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Research Interest Statement *</label>
                    <textarea className="form-textarea" rows="4" placeholder="Describe your proposed research direction…" value={form.statement} onChange={set('statement')} />
                  </div>

                  <div className="form-section-label">Referee & Reference</div>
                  <div className="form-group"><label className="form-label">Referee / Supervisor Name</label><input type="text" className="form-input" placeholder="Name of a senior academic who can vouch for your work" value={form.referee} onChange={set('referee')} /></div>
                  <div className="form-group"><label className="form-label">Referee's Institution & Email</label><input type="text" className="form-input" placeholder="Institution · email@university.edu" value={form.refereeContact} onChange={set('refereeContact')} /></div>

                  <div className="form-section-label">Supporting Documents</div>
                  <div className="form-group">
                    <label className="form-label">Curriculum Vitae (CV / Résumé)</label>
                    <div className="file-upload">
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange('cvFile', setCvFileName)} />
                      <div className="file-upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <div className="file-upload-text"><strong>Click to upload</strong> or drag and drop</div>
                      <div className="file-upload-text" style={{ fontSize: 11, marginTop: 2 }}>PDF, DOC, DOCX — max 5MB</div>
                      {cvFileName && <div className="file-name-display">{cvFileName}</div>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Research Proposal or Track Outline (optional)</label>
                    <div className="file-upload">
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange('proposalFile', setProposalFileName)} />
                      <div className="file-upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className="file-upload-text"><strong>Click to upload</strong> your research proposal</div>
                      <div className="file-upload-text" style={{ fontSize: 11, marginTop: 2 }}>PDF, DOC, DOCX — max 5MB</div>
                      {proposalFileName && <div className="file-name-display">{proposalFileName}</div>}
                    </div>
                  </div>

                  <div className="form-section-label">Final Details</div>
                  <div className="form-group">
                    <label className="form-label">How did you hear about AREF?</label>
                    <select className="form-select" value={form.source} onChange={set('source')}>
                      <option value="">Select…</option>
                      <option>Colleague nomination</option>
                      <option>AREF website</option>
                      <option>Genomac Institute communications</option>
                      <option>Academic conference</option>
                      <option>Social media / LinkedIn</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <button className="form-submit" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Expression of Interest'}
                  </button>
                  <div className="form-note">Your application will be reviewed by the AREF Steering Committee.<br />Expected response within 10 working days of submission.</div>
                  {error && <div style={{ color: 'var(--red,#d9363e)', fontSize: 13, marginTop: '0.75rem', textAlign: 'center' }}>{error}</div>}
                </div>
              ) : (
                <div className="success-panel">
                  <div className="success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green,#0f7b6c)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="success-title">Application Submitted</div>
                  <div className="success-desc">Thank you — your Expression of Interest has been received by the AREF Secretariat. You will hear from us within 10 working days. Please check your institutional email for confirmation.</div>
                  <button
                    style={{ marginTop: '1.5rem', padding: '10px 24px', background: 'var(--purple-600)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                    onClick={() => navigate('/fellows')}
                  >
                    Meet the Fellows
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
