import { useAREF } from '../context/AREFContext.jsx';
export function useFellows() {
  const { fellows, addFellow, updateFellow, removeFellow } = useAREF();
  return { fellows, addFellow, updateFellow, removeFellow };
}
