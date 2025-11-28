import React, { useState } from 'react';
import { User, Bell, Moon, Shield, LogOut, Camera, Save } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/Card';
import { useAuth } from '../context/AuthContext';

export function SettingsPage() {
  const { user, logout, updateProfile } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhoto, setEditPhoto] = useState(user.photo || '');

  const handleSaveProfile = () => {
    updateProfile(editName, editPhoto);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Card>
        <CardHeader>
          <div className="text-lg font-semibold text-gray-800">Settings</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold overflow-hidden">
                  {user.photo || editPhoto ? (
                    <img src={user.photo || editPhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                  )}
                </div>
                {isEditing && (
                  <button 
                    className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    onClick={() => {
                      const url = prompt('Enter photo URL:');
                      if (url) setEditPhoto(url);
                    }}
                  >
                    <Camera size={12} />
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="font-semibold text-lg text-gray-900 bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full max-w-xs"
                  />
                ) : (
                  <div className="font-semibold text-lg text-gray-900">{user.name}</div>
                )}
                <div className="text-gray-500">{user.role}</div>
              </div>

              {isEditing ? (
                <button 
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700"
                >
                  <Save size={18} /> Save
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Bell size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Notifications</div>
                    <div className="text-sm text-gray-500">Receive alerts for critical patient updates</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <Shield size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Security</div>
                    <div className="text-sm text-gray-500">Manage password and 2FA</div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  Manage
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700"
              >
                <LogOut size={20} /> Sign Out
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
