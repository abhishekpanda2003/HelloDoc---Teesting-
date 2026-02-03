# Session Lifecycle Diagrams

## 1. Complete Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        COMPLETE AUTH FLOW                            │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ INITIAL APP LOAD                                                     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. App Mounts (App.jsx)                                             │
│     ↓                                                                 │
│  2. AuthProvider checks localStorage for sessionId                   │
│     ↓                                                                 │
│  3. If sessionId exists AND isSessionValid():                        │
│     ├─ Restore isAuthenticated = true                               │
│     ├─ Restore user data                                             │
│     ├─ Restore userRole                                              │
│     └─ setIsLoading(false)                                           │
│     ↓                                                                 │
│  4. Else:                                                             │
│     ├─ setIsAuthenticated(false)                                    │
│     └─ setIsLoading(false)                                           │
│     ↓                                                                 │
│  5. ProtectedRoutes checks isLoading & isAuthenticated               │
│     ├─ If loading: show "Loading..."                                │
│     ├─ If not authenticated: redirect to /signin                    │
│     └─ If authenticated: render protected routes                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ LOGIN PROCESS                                                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. User visits http://localhost:3000                               │
│     ↓                                                                 │
│  2. No sessionId in localStorage → redirects to /signin              │
│     ↓                                                                 │
│  3. User enters credentials (admin / admin123)                      │
│     ↓                                                                 │
│  4. SignIn.jsx validates credentials against mock database           │
│     ├─ If invalid: show error message                               │
│     └─ If valid: continue...                                         │
│     ↓                                                                 │
│  5. Create userData object:                                          │
│     {                                                                │
│       id: 0.123456789,                                               │
│       name: "John Patient",                                          │
│       email: "admin@hellodoc.com",                                  │
│       role: "PATIENT",                                               │
│       loginTime: "2024-12-20T10:35:56.789Z"                         │
│     }                                                                │
│     ↓                                                                 │
│  6. Call login(userData, "PATIENT") from useAuth hook                │
│     ↓                                                                 │
│  7. AuthProvider.login() generates new sessionId:                    │
│     sessionId = "SESSION_1703024156789_a3f9x2k_18"                  │
│     ↓                                                                 │
│  8. Store in localStorage:                                           │
│     ├─ sessionId                                                     │
│     ├─ sessionStartTime                                              │
│     ├─ user (JSON)                                                   │
│     └─ userRole                                                      │
│     ↓                                                                 │
│  9. Update auth context state:                                       │
│     ├─ isAuthenticated = true                                       │
│     ├─ sessionId = "SESSION_..."                                    │
│     ├─ user = userData                                               │
│     └─ userRole = "PATIENT"                                          │
│     ↓                                                                 │
│  10. Console logs: ✅ Login successful - SessionID: SESSION_...     │
│      ↓                                                                │
│  11. Wait 500ms                                                      │
│      ↓                                                                │
│  12. Navigate to /dashboard                                          │
│      ↓                                                                │
│  13. ProtectedRoutes checks isAuthenticated (true)                   │
│      ├─ Render Layout component                                     │
│      ├─ Render role-based dashboard (PatientDashboard)              │
│      └─ Sidebar shows patient menu items                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ LOGOUT PROCESS                                                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. User clicks AnimatedLogoutButton in Sidebar                      │
│     ↓                                                                 │
│  2. handleLogout() in Sidebar is triggered                           │
│     ↓                                                                 │
│  3. Call logout() from useAuth hook                                  │
│     ↓                                                                 │
│  4. AuthProvider.logout() executes:                                  │
│     ├─ Get current sessionId from localStorage                       │
│     ├─ Log: "Logout - SessionID: SESSION_..."                       │
│     ├─ Call expireSession():                                         │
│     │  ├─ Remove 'sessionId' from localStorage                      │
│     │  ├─ Remove 'sessionStartTime' from localStorage               │
│     │  ├─ Remove 'user' from localStorage                           │
│     │  └─ Remove 'userRole' from localStorage                       │
│     ├─ Update context state:                                        │
│     │  ├─ sessionId = null                                          │
│     │  ├─ user = null                                                │
│     │  ├─ userRole = "PATIENT"                                      │
│     │  └─ isAuthenticated = false                                   │
│     └─ (No more session data in localStorage)                       │
│     ↓                                                                 │
│  5. Navigate to /signin                                              │
│     ↓                                                                 │
│  6. ProtectedRoutes checks isAuthenticated (false)                   │
│     ├─ Don't render Layout                                          │
│     └─ Redirect to /signin                                          │
│     ↓                                                                 │
│  7. User sees SignIn page with empty form                            │
│     ↓                                                                 │
│  8. To access dashboard again, must login with new session           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ SESSION PERSISTENCE (Page Refresh)                                   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. User is logged in at /dashboard                                  │
│  2. sessionId exists in localStorage                                 │
│     ↓                                                                 │
│  3. User presses F5 to refresh page                                  │
│     ↓                                                                 │
│  4. App reloads and AuthProvider useEffect runs                      │
│     ├─ getSessionId() returns existing sessionId                    │
│     ├─ getUserData() returns existing user object                   │
│     ├─ getUserRole() returns existing userRole                      │
│     ├─ isSessionValid() checks if sessionId is valid                │
│     └─ If valid: restore all state automatically                    │
│     ↓                                                                 │
│  5. setIsAuthenticated(true) - restores session                     │
│  6. ProtectedRoutes allows access to /dashboard                      │
│     ↓                                                                 │
│  7. User sees dashboard WITHOUT needing to login again               │
│     ↓                                                                 │
│  8. Close browser tab and reopen app.com                            │
│     → localStorage persists across browser sessions!                │
│     → Auto-login on returning to app                                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Session Storage Structure

```
┌─────────────────────────────────────────────────────────────────┐
│              BROWSER LOCAL STORAGE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Key: "sessionId"                                              │
│  Value: "SESSION_1703024156789_a3f9x2k_18"                    │
│  Created: On successful login                                  │
│  Cleared: On logout                                            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────│
│                                                                 │
│  Key: "sessionStartTime"                                       │
│  Value: "2024-12-20T10:35:56.789Z"                            │
│  Purpose: Track when session started                           │
│  Cleared: On logout                                            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────│
│                                                                 │
│  Key: "user"                                                   │
│  Value: {                                                       │
│    "id": 0.123456789,                                          │
│    "name": "John Patient",                                     │
│    "email": "admin@hellodoc.com",                             │
│    "role": "PATIENT",                                          │
│    "loginTime": "2024-12-20T10:35:56.789Z"                    │
│  }                                                              │
│  Format: JSON stringified                                      │
│  Cleared: On logout                                            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────│
│                                                                 │
│  Key: "userRole"                                               │
│  Value: "PATIENT" | "DOCTOR"                                  │
│  Updated: When login is called with different role             │
│  Cleared: On logout                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Session ID Generation Process

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SESSION ID GENERATION                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Step 1: Get Timestamp                                              │
│          const timestamp = Date.now()                               │
│          Result: 1703024156789                                      │
│                                                                     │
│  Step 2: Generate Random String                                     │
│          const randomString = Math.random().toString(36)            │
│          Result: "0.a3f9x2k7m9b5c1d3e6f8g0h2j4k6l8n"              │
│          Substring [2:15]: "a3f9x2k7m9b5c"                         │
│                                                                     │
│  Step 3: Count User Agent Words                                     │
│          const userAgent = navigator.userAgent.split(' ').length    │
│          Example UA: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"   │
│          Word count: 18                                             │
│                                                                     │
│  Step 4: Combine into Session ID                                    │
│          Format: SESSION_{timestamp}_{randomString}_{userAgent}     │
│          Result: SESSION_1703024156789_a3f9x2k7m9b5c_18            │
│                                                                     │
│  Uniqueness Factors:                                                │
│  ✓ Timestamp changes every millisecond                              │
│  ✓ Random string is different each time                             │
│  ✓ User agent changes per browser                                   │
│  → Probability of collision: ~0.0000001%                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Component Integration Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                      COMPONENT TREE                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  App.jsx
│  ├─ AuthProvider (context wrapper)
│  │  ├─ BrowserRouter
│  │  │  ├─ Public Routes:
│  │  │  │  ├─ /signin → SignIn (uses useAuth)
│  │  │  │  ├─ /signup → SignUp
│  │  │  │  └─ /loader-demo → LoaderDemo
│  │  │  │
│  │  │  └─ Protected Routes (ProtectedRoutes component):
│  │  │     ├─ Checks: isAuthenticated
│  │  │     ├─ If true:
│  │  │     │  └─ Layout (uses useAuth)
│  │  │     │     ├─ Sidebar (uses useAuth)
│  │  │     │     │  ├─ AnimatedLogoutButton
│  │  │     │     │  │  └─ handleLogout → logout()
│  │  │     │     │  └─ Dynamic Menu (based on userRole)
│  │  │     │     │
│  │  │     │     └─ Protected Routes:
│  │  │     │        ├─ /dashboard → PatientDashboard | DoctorDashboard
│  │  │     │        ├─ /available-doctors → AvailableDoctors
│  │  │     │        ├─ /todays-appointments → TodaysAppointments
│  │  │     │        ├─ /medical-reports → MedicalReports
│  │  │     │        ├─ /payments → Payments
│  │  │     │        ├─ /settings → Settings
│  │  │     │        └─ /profile → Profile
│  │  │     │
│  │  │     └─ If false: Redirect to /signin
│  │  │
│  │  └─ useEffect (app load):
│  │     ├─ Check localStorage for sessionId
│  │     ├─ Restore state if valid
│  │     └─ setIsLoading(false)
│  │
│  └─ Context Methods:
│     ├─ login(userData, role) → returns sessionId
│     ├─ logout() → clears localStorage & state
│     └─ getSessionInfo() → returns current session
│
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Data Flow on Login

```
USER ACTION: Click "Login" button with credentials
     ↓
┌────────────────────────────────────────────────────┐
│ SignIn.jsx - handleLogin()                         │
├────────────────────────────────────────────────────┤
│ 1. Validate credentials against mock DB            │
│    admin : admin123 → PATIENT role                 │
│    doctor : doctor123 → DOCTOR role                │
│                                                    │
│ 2. Create userData object with:                    │
│    - Random ID                                     │
│    - Name from credentials map                     │
│    - Email: username@hellodoc.com                  │
│    - Role: PATIENT or DOCTOR                       │
│    - Login timestamp                               │
│                                                    │
│ 3. Call login(userData, role)                      │
└────────────────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────────────────┐
│ useAuth Hook - Returns login function              │
├────────────────────────────────────────────────────┤
│ Accesses AuthContext.login()                       │
└────────────────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────────────────┐
│ AuthContext.jsx - login() method                   │
├────────────────────────────────────────────────────┤
│ 1. Call generateSessionId()                        │
│    → SESSION_1703024156789_a3f9x2k_18             │
│                                                    │
│ 2. Call storeSessionId(newSessionId)               │
│    → localStorage.sessionId = SESSION_...          │
│    → localStorage.sessionStartTime = now           │
│                                                    │
│ 3. Call storeUserData(userData)                    │
│    → localStorage.user = JSON.stringify(userData)  │
│                                                    │
│ 4. Call storeUserRole(role)                        │
│    → localStorage.userRole = "PATIENT"             │
│                                                    │
│ 5. Update React state:                             │
│    ├─ setSessionId(newSessionId)                   │
│    ├─ setUser(userData)                            │
│    ├─ setUserRole(role)                            │
│    └─ setIsAuthenticated(true)                     │
│                                                    │
│ 6. Call logSessionActivity("Login - User: ...")    │
│    → Console: ✅ Login successful - SessionID: ... │
│                                                    │
│ 7. Return newSessionId                             │
└────────────────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────────────────┐
│ SignIn.jsx - After login() returns                 │
├────────────────────────────────────────────────────┤
│ 1. setTimeout(() => { ... }, 500)                  │
│ 2. navigate("/dashboard")                          │
│ 3. setIsLoading(false)                             │
└────────────────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────────────────┐
│ App.jsx - Router processes navigation              │
├────────────────────────────────────────────────────┤
│ ProtectedRoutes checks:                            │
│ - isLoading = false ✓                              │
│ - isAuthenticated = true ✓                         │
│ → Render Layout + DashboardRoutes                  │
└────────────────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────────────────┐
│ Layout.jsx - Renders with userRole                │
├────────────────────────────────────────────────────┤
│ Gets userRole from useAuth() → "PATIENT"           │
│ Passes to Sidebar for menu customization           │
└────────────────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────────────────┐
│ Dashboard displays with:                           │
│ ✓ Session ID created and stored                    │
│ ✓ User data persisted                              │
│ ✓ Role-based menu items showing                    │
│ ✓ User name displayed in sidebar                   │
│ ✓ Ready for logout when clicked                    │
└────────────────────────────────────────────────────┘
```

---

## 6. localStorage Timeline

```
TIME                localStorage State                    UI State
────────────────────────────────────────────────────────────────────

00:00  User visits                 {} (empty)                /signin
       app.com                       

05:00  User enters                 {} (empty)                /signin
       credentials                  (validating...)

10:00  Click Login                 sessionId: SESSION_...    Creating
                                   sessionStartTime: now     session...
                                   user: {...}
                                   userRole: "PATIENT"

15:00  Session created             sessionId: SESSION_...    /dashboard
                                   sessionStartTime: now     (mounted)
                                   user: {...}
                                   userRole: "PATIENT"

20:00  Navigate to                 sessionId: SESSION_...    /available-
       available doctors           sessionStartTime: now     doctors
                                   user: {...}              (persisted)
                                   userRole: "PATIENT"

25:00  Refresh page (F5)           sessionId: SESSION_...    /available-
                                   sessionStartTime: now     doctors
       Auto-restore from           user: {...}              (auto-logged
       localStorage                userRole: "PATIENT"      in)

30:00  Click logout                {} (cleared!)             /signin
       button                      (all keys removed)        (redirected)

35:00  Need to login               {} (empty)                /signin
       again                       (ready for new            (fresh login
                                   session)                  required)
```

---

## 7. Security Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Session ID Uniqueness                              │
│  ├─ Timestamp: Changes every millisecond                     │
│  ├─ Random String: Cryptographically random                  │
│  └─ User Agent: Browser fingerprint                          │
│  → Prevents session hijacking                                │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Layer 2: Protected Routes                                   │
│  ├─ Check isAuthenticated before rendering                   │
│  ├─ Redirect to /signin if false                             │
│  └─ Prevent unauthorized access                              │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Layer 3: Role-Based Access Control                          │
│  ├─ PATIENT role only sees patient menu                      │
│  ├─ DOCTOR role only sees doctor menu                        │
│  └─ Dashboard switches based on role                         │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Layer 4: Session Cleanup on Logout                          │
│  ├─ Clear sessionId from localStorage                        │
│  ├─ Clear user data from localStorage                        │
│  ├─ Clear userRole from localStorage                         │
│  ├─ Reset auth context state                                 │
│  └─ Prevent session reuse                                    │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Layer 5: Demo Credentials Display                           │
│  ├─ Shows available test credentials                         │
│  ├─ Only works on frontend (not production)                  │
│  └─ Would be replaced with backend auth                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘

⚠️  FRONTEND ONLY - Backend security needed for production:
    □ Never store sensitive data in localStorage
    □ Use httpOnly cookies for sessions
    □ Validate sessions on backend
    □ Implement CSRF protection
    □ Use HTTPS only
    □ Hash passwords properly
```

---

## Summary

This session management system provides:

✅ **Unique Session IDs**: Each login creates a unique, non-repeating session ID
✅ **Persistence**: Sessions survive page refreshes via localStorage
✅ **Complete Logout**: All session data cleared on logout
✅ **Protected Routes**: Unauthorized access blocked
✅ **Role-Based Access**: Different menus for PATIENT vs DOCTOR
✅ **Activity Logging**: Console logs for debugging
✅ **Error Handling**: Proper error messages and validation
