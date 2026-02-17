import { Moon, Bell, Shield, Database } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">App configuration and preferences</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        <SettingRow
          icon={<Moon size={20} />}
          title="Dark Mode"
          desc="Switch to a darker theme for low light"
          action={<Toggle />}
        />
        <SettingRow
          icon={<Bell size={20} />}
          title="Notifications"
          desc="Receive alerts for high/low glucose"
          action={<Toggle checked />}
        />
        <SettingRow
          icon={<Database size={20} />}
          title="Units"
          desc="Display glucose in mg/dL or mmol/L"
          action={<span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-md">mg/dL</span>}
        />
        <SettingRow
          icon={<Shield size={20} />}
          title="Security"
          desc="Change password and 2FA"
          action={<button className="text-blue-600 font-medium text-sm hover:underline">Manage</button>}
        />
      </div>
    </div>
  );
}

function SettingRow({ icon, title, desc, action }) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-gray-400">{icon}</div>
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div className="text-sm text-gray-500">{desc}</div>
        </div>
      </div>
      <div>{action}</div>
    </div>
  )
}

function Toggle({ checked }) {
  return (
    <div className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  )
}
