# Session Management & Authentication System

## Overview

The HelloDoc application now implements a comprehensive session management system with unique session IDs that are created upon login and expired upon logout. This ensures application security and user authenticity.

---

## Session ID Generation

### Format
```
SESSION_{timestamp}_{randomString}_{userAgent}
```

### Example
```
SESSION_1703024156789_a3f9x2k_18
```

**Components:**
- **Timestamp**: Current epoch time in milliseconds
- **Random String**: 13-character random alphanumeric string  
- **User Agent**: Number of words in browser user agent string

---

## Architecture

### Core Files

#### 1. **Session Utilities** (`src/utils/sessionUtils.js`)
Centralized session management functions:

```javascript
// Generate unique session ID
generateSessionId()

// Session lifecycle
storeSessionId(sessionId)
getSessionId()
isSessionValid()
expireSession()  // Clears all session data

// User data management
storeUserData(userData)
getUserData()
storeUserRole(role)
getUserRole()

// Activity logging
logSessionActivity(message)
```

**Storage Location:** `localStorage` for persistent session tracking

---

#### 2. **Authentication Context** (`src/context/AuthContext.jsx`)

Global authentication state provider managing:

- **State Variables:**
  - `isAuthenticated`: Boolean indicating if user is logged in
  - `sessionId`: Current session ID string
  - `user`: User object with name, email, role, etc.
  - `userRole`: "PATIENT" or "DOCTOR"
  - `isLoading`: Loading state for session restoration

- **Methods:**
  - `login(userData, role)` - Creates session on login
  - `logout()` - Expires session on logout
  - `getSessionInfo()` - Returns current session details

- **Session Restoration:**
  - Automatically checks `localStorage` on app load
  - Restores session if valid
  - Prevents need to login again on page refresh

---

#### 3. **useAuth Custom Hook** (`src/hooks/useAuth.js`)

Simple hook to access authentication context in any component:

```javascript
const { 
  isAuthenticated, 
  sessionId, 
  user, 
  userRole, 
  isLoading, 
  login, 
  logout, 
  getSessionInfo 
} = useAuth();
```

**Error Handling:** Throws error if used outside AuthProvider

---

### Integration Points

#### **App.jsx** - Route Protection

```javascript
<AuthProvider>
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<SignIn />} />
      
      {/* Protected routes */}
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  </BrowserRouter>
</AuthProvider>
```

**ProtectedRoutes Component:**
- Checks `isAuthenticated` before rendering
- Redirects to `/signin` if not authenticated
- Loads layout and child routes if authenticated
- Shows loading state while checking session validity

---

#### **SignIn.jsx** - Session Creation

On successful login with correct credentials:

```javascript
const userData = {
  id: Math.random(),
  name: "John Patient",
  email: "admin@hellodoc.com",
  role: "PATIENT",
  loginTime: new Date().toISOString(),
};

const sessionId = login(userData, "PATIENT");
// sessionId example: SESSION_1703024156789_a3f9x2k_18
```

**Demo Credentials:**

| Role   | Username | Password    |
|--------|----------|-------------|
| Patient | admin    | admin123    |
| Doctor  | doctor   | doctor123   |

---

#### **Sidebar.jsx** - Session Expiration

Integrated with useAuth for logout:

```javascript
const { logout, user } = useAuth();

const handleLogout = () => {
  logout();  // Expires session from localStorage
  navigate("/signin");  // Redirects to login page
};
```

**Logout Flow:**
1. User clicks AnimatedLogoutButton
2. `logout()` clears all session data
3. Redux state resets (isAuthenticated = false)
4. User redirected to SignIn page
5. Next page load requires new login with session creation

---

#### **Layout.jsx** - User Role Integration

Gets user role from auth context:

```javascript
const { userRole: authUserRole } = useAuth();
const currentUserRole = authUserRole || userRole;

// Pass to Sidebar for menu customization
<Sidebar userRole={currentUserRole} />
```

---

## Session Data Storage

### localStorage Keys

```javascript
{
  "sessionId": "SESSION_1703024156789_a3f9x2k_18",
  "sessionStartTime": "2024-12-20T10:35:56.789Z",
  "user": {
    "id": 0.123456789,
    "name": "John Patient",
    "email": "admin@hellodoc.com",
    "role": "PATIENT",
    "loginTime": "2024-12-20T10:35:56.789Z"
  },
  "userRole": "PATIENT"
}
```

---

## Authentication Flow

### Login Flow
```
User enters credentials
        ↓
SignIn validates against demo credentials
        ↓
login() creates new sessionId
        ↓
Session data stored in localStorage
        ↓
Auth context updates isAuthenticated = true
        ↓
Redirect to /dashboard
```

### Logout Flow
```
User clicks logout button
        ↓
logout() calls expireSession()
        ↓
localStorage cleared completely
        ↓
Auth context updates isAuthenticated = false
        ↓
Redirect to /signin
        ↓
ProtectedRoutes blocks access to dashboard
```

### Session Restoration Flow
```
App mounts (App.jsx)
        ↓
AuthProvider useEffect checks localStorage
        ↓
If sessionId exists and isValid():
  - Restore isAuthenticated = true
  - Restore user data
  - Restore userRole
        ↓
Else:
  - Stay at /signin
```

---

## Role-Based Routing

### Patient Dashboard
**Accessible with:** `userRole === "PATIENT"`

**Menu Items:**
- Dashboard
- Available Doctors
- Medical Reports
- Payments
- Settings
- My Profile

### Doctor Dashboard
**Accessible with:** `userRole === "DOCTOR"`

**Menu Items:**
- Dashboard
- Today's Appointments
- Settings
- My Profile

---

## Session Timeout

Currently, sessions persist indefinitely in localStorage. To add timeout:

```javascript
// Modify sessionUtils.js
const SESSION_TIMEOUT_MINUTES = 30;

export const isSessionValid = () => {
  const sessionStartTime = localStorage.getItem('sessionStartTime');
  const now = new Date().getTime();
  const startTime = new Date(sessionStartTime).getTime();
  const elapsed = (now - startTime) / (1000 * 60);
  
  return elapsed < SESSION_TIMEOUT_MINUTES;
};
```

---

## Security Considerations

✅ **Implemented:**
- Unique session IDs per login
- Session stored in localStorage
- Session cleared on logout
- Protected routes require valid session
- User data persisted with session

⚠️ **Recommendations:**
- Move sensitive data to httpOnly cookies (backend)
- Implement session timeout (30-60 minutes)
- Add CSRF token for POST requests
- Use HTTPS in production
- Hash passwords in backend
- Implement proper backend authentication
- Add rate limiting for login attempts
- Add 2FA/MFA for enhanced security

---

## Testing the System

### Test Login
1. Navigate to http://localhost:3000
2. Enter "admin" / "admin123"
3. Check browser console for: `✅ Login successful - SessionID: SESSION_...`
4. Check localStorage (DevTools > Application > Storage > Local Storage)
5. Verify redirect to dashboard

### Test Session Persistence
1. After login, refresh page (F5)
2. Session should be restored automatically
3. No need to login again

### Test Logout
1. Click animated logout button in sidebar
2. Watch animation play
3. Check localStorage - should be empty
4. Verify redirect to SignIn
5. Try accessing /dashboard directly - should redirect to /signin

### Test Role-Based Routing
1. Login as "admin" (Patient) - see patient menu
2. Logout
3. Login as "doctor" (Doctor) - see doctor menu with "Today's Appointments"

---

## Console Logs

The system logs session activity to console for debugging:

```javascript
✅ Login successful - SessionID: SESSION_1703024156789_a3f9x2k_18
Session Restored
Logout - SessionID: SESSION_1703024156789_a3f9x2k_18
```

---

## Files Modified

1. **src/utils/sessionUtils.js** (created)
2. **src/context/AuthContext.jsx** (created)
3. **src/hooks/useAuth.js** (created)
4. **src/App.jsx** (modified with AuthProvider)
5. **src/pages/SignIn.jsx** (added session creation)
6. **src/components/Sidebar.jsx** (integrated logout)
7. **src/layout/Layout.jsx** (integrated useAuth)

---

## Future Enhancements

1. **Backend Integration**
   - Replace demo credentials with API authentication
   - Use JWT tokens instead of localStorage session IDs
   - Implement secure token refresh mechanism

2. **Session Management**
   - Add session timeout/expiration
   - Implement "Remember Me" functionality
   - Add concurrent session limiting

3. **Security**
   - Add 2FA/MFA support
   - Implement password reset flow
   - Add audit logging for sensitive actions
   - Implement rate limiting

4. **User Experience**
   - Add session timeout warning
   - Implement "Stay Signed In" option
   - Add auto-logout on inactivity
   - Better error messages for auth failures

---

## Summary

The session management system provides:
✅ Unique session ID creation on login
✅ Session persistence across page refreshes
✅ Session expiration on logout
✅ Role-based route protection
✅ Automatic session restoration
✅ Complete logout with data cleanup
✅ Activity logging for debugging
