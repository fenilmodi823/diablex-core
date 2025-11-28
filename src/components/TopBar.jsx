import React from 'react';
import { Menu, Search, Bell, ChevronsUpDown } from 'lucide-react';

export function TopBar({ onToggleSidebar }) {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="relative flex-1 max-w-xl">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            placeholder="Search patients, reports…"
            className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-100 border border-transparent focus:border-gray-300 outline-none"
          />
        </div>
        <button className="p-2 rounded-xl hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <div className="ml-2 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 grid place-items-center text-white text-xs">
            RK
          </div>
          <div className="text-sm leading-tight">
            <div className="font-semibold">Dr. Rishi Kumar</div>
            <div className="text-gray-500">Endocrinology</div>
          </div>
          <ChevronsUpDown size={16} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
}
