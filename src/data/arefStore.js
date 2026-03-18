import { SEED_FELLOWS, SEED_PROJECTS, SEED_PUBLICATIONS } from './seedData.js';

const KEYS = {
  fellows: 'aref_fellows',
  submissions: 'aref_submissions',
  projects: 'aref_projects',
  publications: 'aref_publications',
  adminAuth: 'aref_admin_auth',
};

const ADMIN_PASSWORD = 'AREF2026admin';

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

function maybeInit() {
  if (load(KEYS.fellows).length === 0) save(KEYS.fellows, SEED_FELLOWS);
  if (load(KEYS.projects).length === 0) save(KEYS.projects, SEED_PROJECTS);
  if (load(KEYS.publications).length === 0) save(KEYS.publications, SEED_PUBLICATIONS);
}
maybeInit();

export const Fellows = {
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
    save(KEYS.fellows, this.all().map(f => f.id === id ? { ...f, ...data, id } : f));
  },
  remove(id) {
    save(KEYS.fellows, this.all().filter(f => f.id !== id));
  },
};

export const Submissions = {
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
    save(KEYS.submissions, this.all().map(s => s.id === id ? { ...s, status } : s));
  },
  remove(id) {
    save(KEYS.submissions, this.all().filter(s => s.id !== id));
  },
};

export const Projects = {
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
    save(KEYS.projects, this.all().map(p => p.id === id ? { ...p, ...data, id } : p));
  },
  remove(id) {
    save(KEYS.projects, this.all().filter(p => p.id !== id));
  },
};

export const Publications = {
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
    save(KEYS.publications, this.all().map(p => p.id === id ? { ...p, ...data, id } : p));
  },
  remove(id) {
    save(KEYS.publications, this.all().filter(p => p.id !== id));
  },
};

export const Auth = {
  check(pw) { return pw === ADMIN_PASSWORD; },
  isLoggedIn() { return sessionStorage.getItem(KEYS.adminAuth) === '1'; },
  login(pw) {
    if (this.check(pw)) { sessionStorage.setItem(KEYS.adminAuth, '1'); return true; }
    return false;
  },
  logout() { sessionStorage.removeItem(KEYS.adminAuth); },
};
