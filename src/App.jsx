import React, { useState } from 'react';
import { LayoutDashboard, Users, FileText, Activity, Calendar, Settings } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PatientsPage } from './pages/Patients';
import { PatientProfile } from './pages/PatientProfile';
import { ReportsPage } from './pages/Reports';
import { TrendsPage } from './pages/Trends';
import { FollowUpPage } from './pages/FollowUp';
import { SettingsPage } from './pages/Settings';
import { seedData } from './lib/seedData';

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [state, setState] = useState(seedData);

  if (!user) {
    return <LoginPage />;
  }

  const nav = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'patients', icon: Users, label: 'Patients' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'trends', icon: Activity, label: 'Trends' },
    { id: 'followup', icon: Calendar, label: 'Follow-up' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard state={state} />;
      case 'patients':
        if (selectedPatient) {
          return (
            <PatientProfile
              patient={selectedPatient}
              onBack={() => setSelectedPatient(null)}
            />
          );
        }
        return (
          <PatientsPage
            state={state}
            setState={setState}
            onPatientClick={setSelectedPatient}
          />
        );
      case 'reports':
        return <ReportsPage />;
      case 'trends':
        return <TrendsPage />;
      case 'followup':
        return <FollowUpPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard state={state} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Diablex
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setSelectedPatient(null);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs overflow-hidden">
              {user.photo ? (
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
