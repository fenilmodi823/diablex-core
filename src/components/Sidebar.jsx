import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  FlaskConical,
  HeartPulse,
  CalendarClock,
  Settings,
  Wifi,
  Server,
} from 'lucide-react';
import { cls } from '../lib/utils';

export function Sidebar({ open, route, setRoute }) {
  const Item = ({ icon: Icon, label, slug }) => (
    <button
      onClick={() => setRoute(slug)}
      className={cls(
        'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition',
        route === slug
          ? 'bg-blue-600 text-white'
          : 'hover:bg-gray-100 text-gray-700'
      )}
    >
      <Icon size={18} />
      {open && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
  return (
    <div
      className={cls(
        'transition-all duration-300 border-r border-gray-200 bg-white p-3 space-y-2',
        open ? 'w-64' : 'w-16'
      )}
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center gap-2 px-2 py-2">
        <div className="h-8 w-8 rounded-xl bg-blue-600 grid place-items-center text-white font-bold">
          D
        </div>
        {open && (
          <div>
            <div className="font-semibold leading-none text-gray-800">
              DiabLex
            </div>
            <div className="text-xs text-gray-500">Clinical Console</div>
          </div>
        )}
      </div>
      <nav className="pt-2 grid gap-1">
        <Item icon={LayoutDashboard} label="Dashboard" slug="dashboard" />
        <Item icon={Users} label="Patients" slug="patients" />
        <Item icon={FileText} label="Reports" slug="reports" />
        <Item icon={Activity} label="Glycemic Trends" slug="trends" />
        <Item icon={FlaskConical} label="Lab Reports" slug="labs" />
        <Item icon={HeartPulse} label="Health Reports" slug="health" />
        <Item icon={CalendarClock} label="Follow-Up" slug="follow" />
        <Item icon={Settings} label="Settings" slug="settings" />
      </nav>
      <div className="mt-4 p-3 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-teal-50">
        {open && (
          <>
            <div className="text-xs text-gray-600 mb-1">Hub Status</div>
            <div className="flex items-center gap-2 text-sm">
              <Wifi className="text-emerald-600" size={16} /> Online
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <Server className="text-blue-600" size={16} /> Ingest v1.2
            </div>
          </>
        )}
      </div>
    </div>
  );
}
