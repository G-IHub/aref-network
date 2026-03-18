/**
 * AREF Data Layer
 * Central localStorage storage engine shared across all pages.
 * All reads/writes go through this module.
 */

const AREF = (() => {

  const KEYS = {
    fellows: 'aref_fellows',
    submissions: 'aref_submissions',
    projects: 'aref_projects',
    publications: 'aref_publications',
    adminAuth: 'aref_admin_auth',
  };

  /* ── helpers ── */
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  }
  function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* ── seed demo data if empty ── */
  function maybeInit() {
    if (load(KEYS.fellows).length === 0) {
      save(KEYS.fellows, SEED_FELLOWS);
    }
    if (load(KEYS.projects).length === 0) {
      save(KEYS.projects, SEED_PROJECTS);
    }
    if (load(KEYS.publications).length === 0) {
      save(KEYS.publications, SEED_PUBLICATIONS);
    }
  }

  /* ══════════════════════════════════════
     FELLOWS
  ══════════════════════════════════════ */
  const Fellows = {
    all() { return load(KEYS.fellows); },
    get(id) { return this.all().find(f => f.id === id) || null; },
    add(data) {
      const list = this.all();
      const fellow = { ...data, id: uid(), createdAt: new Date().toISOString() };
      list.push(fellow);
      save(KEYS.fellows, list);
      return fellow;
    },
    update(id, data) {
      const list = this.all().map(f => f.id === id ? { ...f, ...data, id } : f);
      save(KEYS.fellows, list);
    },
    remove(id) {
      save(KEYS.fellows, this.all().filter(f => f.id !== id));
    },
  };

  /* ══════════════════════════════════════
     SUBMISSIONS
  ══════════════════════════════════════ */
  const Submissions = {
    all() { return load(KEYS.submissions); },
    get(id) { return this.all().find(s => s.id === id) || null; },
    add(data) {
      const list = this.all();
      const sub = { ...data, id: uid(), submittedAt: new Date().toISOString(), status: 'new' };
      list.unshift(sub);
      save(KEYS.submissions, list);
      return sub;
    },
    setStatus(id, status) {
      const list = this.all().map(s => s.id === id ? { ...s, status } : s);
      save(KEYS.submissions, list);
    },
    remove(id) {
      save(KEYS.submissions, this.all().filter(s => s.id !== id));
    },
  };

  /* ══════════════════════════════════════
     PROJECTS
  ══════════════════════════════════════ */
  const Projects = {
    all() { return load(KEYS.projects); },
    get(id) { return this.all().find(p => p.id === id) || null; },
    add(data) {
      const list = this.all();
      const proj = { ...data, id: uid(), createdAt: new Date().toISOString() };
      list.unshift(proj);
      save(KEYS.projects, list);
      return proj;
    },
    update(id, data) {
      const list = this.all().map(p => p.id === id ? { ...p, ...data, id } : p);
      save(KEYS.projects, list);
    },
    remove(id) {
      save(KEYS.projects, this.all().filter(p => p.id !== id));
    },
  };

  /* ══════════════════════════════════════
     PUBLICATIONS
  ══════════════════════════════════════ */
  const Publications = {
    all() { return load(KEYS.publications); },
    get(id) { return this.all().find(p => p.id === id) || null; },
    add(data) {
      const list = this.all();
      const pub = { ...data, id: uid(), createdAt: new Date().toISOString() };
      list.unshift(pub);
      save(KEYS.publications, list);
      return pub;
    },
    update(id, data) {
      const list = this.all().map(p => p.id === id ? { ...p, ...data, id } : p);
      save(KEYS.publications, list);
    },
    remove(id) {
      save(KEYS.publications, this.all().filter(p => p.id !== id));
    },
  };

  /* ══════════════════════════════════════
     ADMIN AUTH
  ══════════════════════════════════════ */
  const ADMIN_PASSWORD = 'AREF2026admin';
  const Auth = {
    check(pw) { return pw === ADMIN_PASSWORD; },
    isLoggedIn() { return sessionStorage.getItem(KEYS.adminAuth) === '1'; },
    login(pw) {
      if (this.check(pw)) { sessionStorage.setItem(KEYS.adminAuth, '1'); return true; }
      return false;
    },
    logout() { sessionStorage.removeItem(KEYS.adminAuth); },
  };

  /* ══════════════════════════════════════
     SEED DATA
  ══════════════════════════════════════ */
  const SEED_FELLOWS = [
    { id: 'f1', name: 'Dr. Adaeze Okonkwo', title: 'Associate Professor of Molecular Biology', institution: 'University of Lagos', location: 'Lagos, Nigeria', country: 'nigeria', cycle: 'AREF Cycle 2025', status: 'active', priority: true, trackTitle: 'Antimicrobial Resistance Genomics in Clinical Isolates', area: 'pathogen genomics', tags: ['AMR Genomics', 'Whole Genome Sequencing', 'Clinical Microbiology'], bio: 'Dr. Okonkwo leads a multi-cohort research program investigating antimicrobial resistance gene profiles in hospital-acquired bacterial isolates across Lagos teaching hospitals. Her track spans undergraduate screening studies through to doctoral-level phylogenetic network analyses.', students: { ug: 4, msc: 2, phd: 1 }, publications: 3, photoUrl: '', linkedin: 'https://linkedin.com', orcid: '', createdAt: new Date().toISOString() },
    { id: 'f2', name: 'Prof. Kwame Asante-Poku', title: 'Professor of Computational Biology', institution: 'University of Ghana', location: 'Accra, Ghana', country: 'ghana', cycle: 'AREF Cycle 2025', status: 'active', priority: false, trackTitle: 'Population Genomics of Infectious Disease in West Africa', area: 'computational biology', tags: ['Population Genomics', 'GWAS', 'Infectious Disease'], bio: "Prof. Asante-Poku's AREF track focuses on leveraging large-scale public genomic datasets to characterise disease-associated genetic variants in West African populations.", students: { ug: 3, msc: 3, phd: 2 }, publications: 5, photoUrl: '', linkedin: '', orcid: 'https://orcid.org', createdAt: new Date().toISOString() },
    { id: 'f3', name: 'Dr. Muthoni Wachira', title: 'Senior Lecturer, Bioinformatics', institution: 'University of Nairobi', location: 'Nairobi, Kenya', country: 'kenya', cycle: 'AREF Cycle 2025', status: 'active', priority: true, trackTitle: 'Gut Microbiome Diversity and Metabolic Disease in East African Cohorts', area: 'microbiome', tags: ['Microbiome', '16S rRNA', 'Metabolic Disease', 'Metagenomics'], bio: "Dr. Wachira's research program investigates gut microbiome composition and its relationship to type 2 diabetes and obesity in East African populations.", students: { ug: 5, msc: 2, phd: 1 }, publications: 2, photoUrl: '', linkedin: '', orcid: '', createdAt: new Date().toISOString() },
    { id: 'f4', name: 'Dr. Sipho Dlamini', title: 'Lecturer in Medical Genetics', institution: 'University of Cape Town', location: 'Cape Town, South Africa', country: 'south africa', cycle: 'AREF Cycle 2025', status: 'active', priority: false, trackTitle: 'Somatic Mutation Landscapes in South African Colorectal Cancer', area: 'cancer genomics', tags: ['Cancer Genomics', 'Somatic Mutations', 'Colorectal Cancer'], bio: "Dr. Dlamini's AREF track investigates somatic mutation profiles in colorectal cancer cases from Southern African populations.", students: { ug: 2, msc: 3, phd: 2 }, publications: 4, photoUrl: '', linkedin: '', orcid: '', createdAt: new Date().toISOString() },
    { id: 'f5', name: 'Dr. Tigist Haile', title: 'Research Fellow, Genomic Medicine', institution: 'Addis Ababa University', location: 'Addis Ababa, Ethiopia', country: 'ethiopia', cycle: 'AREF Cycle 2025', status: 'active', priority: false, trackTitle: 'Pharmacogenomic Variation in Ethiopian Populations', area: 'computational biology', tags: ['Pharmacogenomics', 'Drug Response', 'Population Genetics'], bio: "Dr. Haile's research track examines population-level pharmacogenomic variants that influence drug metabolism and treatment response.", students: { ug: 3, msc: 2, phd: 1 }, publications: 2, photoUrl: '', linkedin: '', orcid: '', createdAt: new Date().toISOString() },
    { id: 'f6', name: 'Prof. Nkemdirim Eze', title: 'Professor of Microbiology', institution: 'Obafemi Awolowo University', location: 'Ile-Ife, Nigeria', country: 'nigeria', cycle: 'AREF Cycle 2024', status: 'active', priority: true, trackTitle: 'Genomic Epidemiology of Typhoid Fever in Sub-Saharan Africa', area: 'pathogen genomics', tags: ['Typhoid', 'Genomic Epidemiology', 'Salmonella Typhi'], bio: "Prof. Eze leads one of the network's most active research tracks on Salmonella Typhi whole-genome sequencing.", students: { ug: 4, msc: 4, phd: 2 }, publications: 7, photoUrl: '', linkedin: '', orcid: '', createdAt: new Date().toISOString() },
  ];

  const SEED_PROJECTS = [
    { id: 'p1', title: 'AMR Gene Profiling in Lagos Teaching Hospitals', fellowId: 'f1', fellowName: 'Dr. Adaeze Okonkwo', institution: 'University of Lagos', area: 'pathogen genomics', status: 'ongoing', startDate: '2025-01', description: 'Whole-genome sequencing of clinical bacterial isolates to map AMR gene profiles across five major Lagos teaching hospitals. Undergraduate and MSc cohorts conducting initial resistance screening.', students: 6, dataset: 'NCBI SRA + local hospital isolates', tags: ['AMR', 'WGS', 'Clinical'], createdAt: new Date().toISOString() },
    { id: 'p2', title: 'GWAS of Malaria Susceptibility in West African Cohorts', fellowId: 'f2', fellowName: 'Prof. Kwame Asante-Poku', institution: 'University of Ghana', area: 'computational biology', status: 'ongoing', startDate: '2025-03', description: 'Leveraging H3Africa consortium data to identify SNPs associated with differential malaria susceptibility across Ghanaian and Nigerian population cohorts.', students: 8, dataset: 'H3Africa Consortium', tags: ['GWAS', 'Malaria', 'West Africa'], createdAt: new Date().toISOString() },
    { id: 'p3', title: 'Gut Microbiome Signatures in Type 2 Diabetes', fellowId: 'f3', fellowName: 'Dr. Muthoni Wachira', institution: 'University of Nairobi', area: 'microbiome', status: 'ongoing', startDate: '2025-02', description: '16S rRNA amplicon sequencing of gut microbiome samples from 200 East African participants with and without T2D diagnoses, comparing diversity indices and taxa-level differences.', students: 7, dataset: 'Local cohort + MG-RAST public data', tags: ['Microbiome', 'T2D', 'East Africa'], createdAt: new Date().toISOString() },
    { id: 'p4', title: 'Somatic Variant Landscape in South African CRC', fellowId: 'f4', fellowName: 'Dr. Sipho Dlamini', institution: 'University of Cape Town', area: 'cancer genomics', status: 'ongoing', startDate: '2024-09', description: 'Whole exome sequencing of colorectal cancer tumour-normal pairs from Black South African patients, annotating somatic mutations and comparing to TCGA reference profiles.', students: 5, dataset: 'TCGA + local tumour bank', tags: ['CRC', 'WES', 'Somatic Mutations'], createdAt: new Date().toISOString() },
    { id: 'p5', title: 'Typhoid Transmission Phylogenomics in West Africa', fellowId: 'f6', fellowName: 'Prof. Nkemdirim Eze', institution: 'Obafemi Awolowo University', area: 'pathogen genomics', status: 'completed', startDate: '2024-01', description: 'Phylogenomic reconstruction of Salmonella Typhi transmission chains across Nigeria, Benin, and Ghana using publicly available genome datasets and locally generated sequences.', students: 10, dataset: 'Pathogen Watch + local isolates', tags: ['Phylogenomics', 'Typhoid', 'West Africa'], createdAt: new Date().toISOString() },
  ];

  const SEED_PUBLICATIONS = [
    { id: 'pub1', title: 'Antimicrobial Resistance Gene Profiles in Klebsiella pneumoniae Isolates from Lagos Tertiary Hospitals', authors: 'Okonkwo A, Adeyemi T, Bello S', journal: 'Frontiers in Microbiology', year: '2025', doi: '10.3389/fmicb.2025.123456', fellowId: 'f1', fellowName: 'Dr. Adaeze Okonkwo', area: 'pathogen genomics', type: 'Original Article', open: true, createdAt: new Date().toISOString() },
    { id: 'pub2', title: 'Population-Level GWAS Identifies Novel Loci for Plasmodium falciparum Susceptibility in Ghanaian Cohorts', authors: 'Asante-Poku K, Mensah E, Owusu R', journal: 'Nature Communications', year: '2025', doi: '10.1038/s41467-025-12345', fellowId: 'f2', fellowName: 'Prof. Kwame Asante-Poku', area: 'computational biology', type: 'Original Article', open: true, createdAt: new Date().toISOString() },
    { id: 'pub3', title: 'Gut Microbiome Diversity in East African Adults with Type 2 Diabetes: A 16S rRNA Analysis', authors: 'Wachira M, Kamau J, Ndungu P', journal: 'PLOS ONE', year: '2025', doi: '10.1371/journal.pone.2025456', fellowId: 'f3', fellowName: 'Dr. Muthoni Wachira', area: 'microbiome', type: 'Original Article', open: true, createdAt: new Date().toISOString() },
    { id: 'pub4', title: 'Somatic Mutation Landscape of Colorectal Cancer in Black South African Patients', authors: 'Dlamini S, Nkosi B, van der Merwe A', journal: 'Cancer Research', year: '2025', doi: '10.1158/0008-5472.CAN-25-1234', fellowId: 'f4', fellowName: 'Dr. Sipho Dlamini', area: 'cancer genomics', type: 'Original Article', open: false, createdAt: new Date().toISOString() },
    { id: 'pub5', title: 'Phylogenomic Analysis of Salmonella Typhi Transmission in West Africa: 2019–2024', authors: 'Eze N, Adeyemi A, Olusegun K, Mensah T', journal: 'The Lancet Infectious Diseases', year: '2024', doi: '10.1016/S1473-3099(24)123456', fellowId: 'f6', fellowName: 'Prof. Nkemdirim Eze', area: 'pathogen genomics', type: 'Original Article', open: false, createdAt: new Date().toISOString() },
    { id: 'pub6', title: 'Pharmacogenomic Variants in Ethiopian Populations: Implications for Drug Dosing', authors: 'Haile T, Bekele A, Worku Z', journal: 'Pharmacogenomics Journal', year: '2025', doi: '10.1038/s41397-025-00123', fellowId: 'f5', fellowName: 'Dr. Tigist Haile', area: 'computational biology', type: 'Review', open: true, createdAt: new Date().toISOString() },
  ];

  maybeInit();

  return { Fellows, Submissions, Projects, Publications, Auth, uid };
})();
