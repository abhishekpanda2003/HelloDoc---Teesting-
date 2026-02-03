/**
 * Authentication Context
 * 
 * Manages global authentication state, session, and user data
 * Provides auth state to entire application
 */

import { createContext, useState, useEffect, useCallback } from 'react';
import {
  generateSessionId,
  storeSessionId,
  getSessionId,
  expireSession,
  isSessionValid,
  storeUserData,
  getUserData,
  storeUserRole,
  getUserRole,
  logSessionActivity,
} from '../utils/sessionUtils';

// Create Auth Context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('PATIENT');
  const [isLoading, setIsLoading] = useState(true);

  // Check if session exists on app load
  useEffect(() => {
    const storedSessionId = getSessionId();
    const storedUser = getUserData();
    const storedRole = getUserRole();

    if (storedSessionId && isSessionValid()) {
      setIsAuthenticated(true);
      setSessionId(storedSessionId);
      setUser(storedUser);
      setUserRole(storedRole);
      logSessionActivity('Session Restored');
    }

    setIsLoading(false);
  }, []);

  // Login function
  const login = useCallback((userData, role = 'PATIENT') => {
    const newSessionId = generateSessionId();
    
    // Store session
    storeSessionId(newSessionId);
    storeUserData(userData);
    storeUserRole(role);

    // Update state
    setSessionId(newSessionId);
    setUser(userData);
    setUserRole(role);
    setIsAuthenticated(true);

    logSessionActivity(`Login - User: ${userData?.name || 'Unknown'}`);

    return newSessionId;
  }, []);

  // Logout function
  const logout = useCallback(() => {
    const currentSessionId = getSessionId();
    logSessionActivity(`Logout - SessionID: ${currentSessionId}`);

    // Clear session
    expireSession();

    // Update state
    setSessionId(null);
    setUser(null);
    setUserRole('PATIENT');
    setIsAuthenticated(false);
  }, []);

  // Get session info
  const getSessionInfo = useCallback(() => {
    return {
      sessionId,
      isAuthenticated,
      user,
      userRole,
      isValid: isSessionValid(),
    };
  }, [sessionId, isAuthenticated, user, userRole]);

  const value = {
    isAuthenticated,
    sessionId,
    user,
    userRole,
    isLoading,
    login,
    logout,
    getSessionInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
