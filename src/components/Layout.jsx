import { LayoutDashboard, Users, FileText, Settings, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col`}
            >
                <div className="p-6 border-b border-gray-50">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                        Diablex
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">Clinical Dashboard</p>
                </div>

                <nav className="p-4 space-y-1 flex-1">
                    <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <NavItem to="/patients" icon={<Users size={20} />} label="Patients" />
                    <NavItem to="/reports" icon={<FileText size={20} />} label="Reports" />
                    <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <button onClick={logout} className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 lg:px-8">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-500">
                        <Menu />
                    </button>
                    <div className="flex items-center space-x-4 ml-auto">
                        <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span>System Live</span>
                        </div>

                        <div className="flex items-center space-x-3 pl-4 border-l border-gray-100">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                                <div className="text-xs text-gray-500">{user?.role}</div>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
                                {user?.avatar || "DR"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, to }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
        >
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </NavLink>
    );
}
