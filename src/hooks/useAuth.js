import { useAREF } from '../context/AREFContext.jsx';
export function useAuth() {
  const { isAdmin, login, logout } = useAREF();
  return { isAdmin, login, logout };
}
