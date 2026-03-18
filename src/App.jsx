import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Fellows from './pages/Fellows.jsx';
import Apply from './pages/Apply.jsx';
import Network from './pages/Network.jsx';
import ResearchTracks from './pages/ResearchTracks.jsx';
import Projects from './pages/Projects.jsx';
import Publications from './pages/Publications.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="fellows" element={<Fellows />} />
        <Route path="apply" element={<Apply />} />
        <Route path="network" element={<Network />} />
        <Route path="research-tracks" element={<ResearchTracks />} />
        <Route path="projects" element={<Projects />} />
        <Route path="publications" element={<Publications />} />
      </Route>
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
