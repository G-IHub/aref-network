import { useAREF } from '../context/AREFContext.jsx';
export function useProjects() {
  const { projects, addProject, updateProject, removeProject } = useAREF();
  return { projects, addProject, updateProject, removeProject };
}
