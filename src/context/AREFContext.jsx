import { createContext, useContext, useState, useCallback } from 'react';
import * as Store from '../data/arefStore.js';

const AREFContext = createContext(null);

export function AREFProvider({ children }) {
  const [fellows, setFellows] = useState(() => Store.Fellows.all());
  const [projects, setProjects] = useState(() => Store.Projects.all());
  const [publications, setPublications] = useState(() => Store.Publications.all());
  const [submissions, setSubmissions] = useState(() => Store.Submissions.all());
  const [isAdmin, setIsAdmin] = useState(() => Store.Auth.isLoggedIn());

  const refreshFellows = useCallback(() => setFellows(Store.Fellows.all()), []);
  const refreshProjects = useCallback(() => setProjects(Store.Projects.all()), []);
  const refreshPublications = useCallback(() => setPublications(Store.Publications.all()), []);
  const refreshSubmissions = useCallback(() => setSubmissions(Store.Submissions.all()), []);

  const addFellow = useCallback((data) => { Store.Fellows.add(data); refreshFellows(); }, [refreshFellows]);
  const updateFellow = useCallback((id, data) => { Store.Fellows.update(id, data); refreshFellows(); }, [refreshFellows]);
  const removeFellow = useCallback((id) => { Store.Fellows.remove(id); refreshFellows(); }, [refreshFellows]);

  const addProject = useCallback((data) => { Store.Projects.add(data); refreshProjects(); }, [refreshProjects]);
  const updateProject = useCallback((id, data) => { Store.Projects.update(id, data); refreshProjects(); }, [refreshProjects]);
  const removeProject = useCallback((id) => { Store.Projects.remove(id); refreshProjects(); }, [refreshProjects]);

  const addPublication = useCallback((data) => { Store.Publications.add(data); refreshPublications(); }, [refreshPublications]);
  const updatePublication = useCallback((id, data) => { Store.Publications.update(id, data); refreshPublications(); }, [refreshPublications]);
  const removePublication = useCallback((id) => { Store.Publications.remove(id); refreshPublications(); }, [refreshPublications]);

  const addSubmission = useCallback((data) => { Store.Submissions.add(data); refreshSubmissions(); }, [refreshSubmissions]);
  const setSubmissionStatus = useCallback((id, status) => { Store.Submissions.setStatus(id, status); refreshSubmissions(); }, [refreshSubmissions]);
  const removeSubmission = useCallback((id) => { Store.Submissions.remove(id); refreshSubmissions(); }, [refreshSubmissions]);

  const login = useCallback((pw) => {
    const ok = Store.Auth.login(pw);
    if (ok) setIsAdmin(true);
    return ok;
  }, []);
  const logout = useCallback(() => { Store.Auth.logout(); setIsAdmin(false); }, []);

  return (
    <AREFContext.Provider value={{
      fellows, projects, publications, submissions, isAdmin,
      addFellow, updateFellow, removeFellow,
      addProject, updateProject, removeProject,
      addPublication, updatePublication, removePublication,
      addSubmission, setSubmissionStatus, removeSubmission,
      login, logout,
    }}>
      {children}
    </AREFContext.Provider>
  );
}

export const useAREF = () => useContext(AREFContext);
