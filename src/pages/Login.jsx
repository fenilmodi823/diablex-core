import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User } from 'lucide-react';

export function LoginPage() {
  const { login } = useAuth();
  const [selectedDoc, setSelectedDoc] = useState('1');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(selectedDoc, code)) {
      setError('');
    } else {
      setError('Invalid 2FA Code (Try 123456)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Diablex Secure Login</h1>
          <p className="text-gray-500 mt-2">Select your profile and enter 2FA code</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Profile</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: '1', name: 'Dr. Dhruv', role: 'Endocrinologist' },
                { id: '2', name: 'Dr. Sarah', role: 'Diabetologist' },
                { id: '3', name: 'Dr. Mike', role: 'General Physician' },
              ].map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedDoc === doc.id
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{doc.name}</div>
                    <div className="text-xs text-gray-500">{doc.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">2FA Code</label>
            <input
              type="text"
              maxLength={6}
              placeholder="000000"
              className="w-full text-center text-2xl tracking-widest py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Verify & Login
          </button>
        </form>
      </div>
    </div>
  );
}
