import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar.jsx';
import DashboardPanel from '../../components/admin/DashboardPanel.jsx';
import FellowsPanel from '../../components/admin/FellowsPanel.jsx';
import ProjectsPanel from '../../components/admin/ProjectsPanel.jsx';
import PublicationsPanel from '../../components/admin/PublicationsPanel.jsx';
import SubmissionsPanel from '../../components/admin/SubmissionsPanel.jsx';
import Toast from '../../components/ui/Toast.jsx';

const PANEL_TITLES = {
  dashboard: 'Dashboard',
  fellows: 'Fellows',
  projects: 'Research Projects',
  publications: 'Publications',
  submissions: 'Submissions',
};

export default function AdminDashboard() {
  const [activePanel, setActivePanel] = useState('dashboard');
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  function showToast(message, type = '') {
    setToast({ message, type, visible: true });
  }

  useEffect(() => {
    if (!toast.visible) return;
    const tid = setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    return () => clearTimeout(tid);
  }, [toast.visible, toast.message]);

  return (
    <div className="shell">
      <AdminSidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <main className="main">
        <div className="topbar">
          <div className="topbar-title">{PANEL_TITLES[activePanel] || activePanel}</div>
          <div className="topbar-actions">
            {activePanel === 'fellows' && <button className="btn btn-primary" onClick={() => document.dispatchEvent(new Event('admin:addFellow'))}>+ Add Fellow</button>}
            {activePanel === 'projects' && <button className="btn btn-primary" onClick={() => document.dispatchEvent(new Event('admin:addProject'))}>+ Add Project</button>}
            {activePanel === 'publications' && <button className="btn btn-primary" onClick={() => document.dispatchEvent(new Event('admin:addPub'))}>+ Add Publication</button>}
          </div>
        </div>
        <div className="content">
          {activePanel === 'dashboard' && <DashboardPanel setActivePanel={setActivePanel} showToast={showToast} />}
          {activePanel === 'fellows' && <FellowsPanel showToast={showToast} />}
          {activePanel === 'projects' && <ProjectsPanel showToast={showToast} />}
          {activePanel === 'publications' && <PublicationsPanel showToast={showToast} />}
          {activePanel === 'submissions' && <SubmissionsPanel showToast={showToast} />}
        </div>
      </main>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}
