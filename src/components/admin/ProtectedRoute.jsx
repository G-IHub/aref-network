import { useAuth } from '../../hooks/useAuth.js';
import AdminLogin from '../../pages/admin/AdminLogin.jsx';

export default function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <AdminLogin />;
}
