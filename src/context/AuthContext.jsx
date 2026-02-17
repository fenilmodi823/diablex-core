import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent login
    const storedUser = localStorage.getItem("diablex_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    // In a real app, this would hit the backend API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: "u_001",
            name: "Dr. Smith",
            email: email,
            role: email.includes("admin") ? "admin" : "doctor",
            avatar: "DR"
          };
          setUser(mockUser);
          localStorage.setItem("diablex_user", JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("diablex_user");
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
