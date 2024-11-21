import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // If token exists, user is logged in
    }
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);  // Set login state to true
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Set login state to false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to consume the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
