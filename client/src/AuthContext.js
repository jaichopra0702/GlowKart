import React, { createContext, useState, useEffect, useContext } from 'react';
const backendUrl = process.env.REACT_APP_API_URL;
const AuthContext = createContext();
const apiUrl = 'https://glowkart-backend-nqnn.onrender.com'; // Correct backend URL
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the session cookie exists and user is logged in (e.g., checking if session is valid on a backend endpoint)
    const checkSession = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/myAccount`, {
          method: 'GET',
          credentials: 'include', // Include cookies (session ID)
        });

        if (response.ok) {
          setIsLoggedIn(true); // If session is valid, the user is logged in
        } else {
          setIsLoggedIn(false); // Session is not valid
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false); // Handle error, consider user not logged in
      }
    };

    checkSession(); // Call the function to check session when the app loads
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const login = () => {
    setIsLoggedIn(true); // Update state to logged in (session handled by the server)
  };

  const logout = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/logout`, {
        method: 'POST',
        credentials: 'include', // Include cookies (session ID)
      });

      if (response.ok) {
        setIsLoggedIn(false); // Set login state to false on logout
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
