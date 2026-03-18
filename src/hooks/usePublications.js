import { useAREF } from '../context/AREFContext.jsx';
export function usePublications() {
  const { publications, addPublication, updatePublication, removePublication } = useAREF();
  return { publications, addPublication, updatePublication, removePublication };
}
