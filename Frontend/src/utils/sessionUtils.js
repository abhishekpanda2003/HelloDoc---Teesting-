/**
 * Session Utilities
 * 
 * Handles session ID generation, storage, and management
 */

// Generate a unique session ID
export const generateSessionId = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const userAgent = navigator.userAgent.split(' ').length;
  return `SESSION_${timestamp}_${randomString}_${userAgent}`;
};

// Store session ID in localStorage
export const storeSessionId = (sessionId) => {
  localStorage.setItem('sessionId', sessionId);
  localStorage.setItem('sessionStartTime', new Date().toISOString());
};

// Get stored session ID
export const getSessionId = () => {
  return localStorage.getItem('sessionId');
};

// Get session start time
export const getSessionStartTime = () => {
  return localStorage.getItem('sessionStartTime');
};

// Check if session is valid
export const isSessionValid = () => {
  const sessionId = localStorage.getItem('sessionId');
  return sessionId !== null && sessionId !== undefined && sessionId !== '';
};

// Clear/Expire session
export const expireSession = () => {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('sessionStartTime');
  localStorage.removeItem('user');
  localStorage.removeItem('userRole');
};

// Store user data
export const storeUserData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

// Get user data
export const getUserData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Store user role
export const storeUserRole = (role) => {
  localStorage.setItem('userRole', role);
};

// Get user role
export const getUserRole = () => {
  return localStorage.getItem('userRole') || 'PATIENT';
};

// Log session activity (for debugging/monitoring)
export const logSessionActivity = (action) => {
  const sessionId = getSessionId();
  const timestamp = new Date().toISOString();
  console.log(`[SESSION LOG] ${timestamp} - Action: ${action}, SessionID: ${sessionId}`);
};
