import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role, photo }

  const login = (userId, code) => {
    // Mock 2FA verification
    if (code !== '123456') return false;

    const doctors = {
      '1': { id: '1', name: 'Dr. Dhruv', role: 'Endocrinologist', photo: null },
      '2': { id: '2', name: 'Dr. Sarah', role: 'Diabetologist', photo: null },
      '3': { id: '3', name: 'Dr. Mike', role: 'General Physician', photo: null },
    };

    if (doctors[userId]) {
      setUser(doctors[userId]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (name, photo) => {
    setUser(prev => ({ ...prev, name, photo }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
