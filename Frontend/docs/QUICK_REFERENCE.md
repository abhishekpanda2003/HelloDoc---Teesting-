# HelloDoc Frontend - Quick Reference Guide

## 🚀 Quick Start

### Installation
```bash
npm install
npm start
```

### Login Credentials (Demo)
- **Username:** admin
- **Password:** admin123

### Routes
| Route | Purpose | Layout |
|-------|---------|--------|
| `/signin` | Login page | None |
| `/signup` | Registration | None |
| `/dashboard` | Home (role-based) | Layout |
| `/available-doctors` | Doctor search | Layout |
| `/book-appointment` | Appointment booking | Layout |
| `/medical-reports` | Medical records | Layout |
| `/payments` | Billing | Layout |
| `/settings` | User settings | Layout |
| `/profile` | User profile | Layout |
| `/loader-demo` | Loader preview | None |

---

## 📁 File Structure at a Glance

```
src/
├── App.jsx                    # Routes & router config
├── index.js                   # Entry point
├── components/                # Reusable components
├── pages/                     # Page components (1 per route)
├── layout/
│   └── Layout.jsx             # Main layout wrapper
└── styles/
    ├── globals.css            # Global styles
    ├── pages/                 # Page-specific CSS
    └── components/            # Component-specific CSS
```

---

## 🎨 Loader Component Usage

```jsx
// Import
import Loader from "../components/Loader";

// Basic usage (default spinner)
<Loader />

// Ring loader (RECOMMENDED FOR PRODUCTION)
<Loader type="ring" message="Loading..." />

// Other types
<Loader type="pulse" message="Fetching..." />
<Loader type="dots" message="Please wait..." />
<Loader type="gradient" message="Loading..." />
<Loader type="wave" message="Preparing..." />
<Loader type="spinner" message="Processing..." />

// No message
<Loader type="ring" />

// With loading state
const [isLoading, setIsLoading] = useState(false);

return (
  <>
    {isLoading ? (
      <Loader type="ring" message="Loading..." />
    ) : (
      <div className="content">
        {/* Page content */}
      </div>
    )}
  </>
);
```

---

## 🔀 Navigation Examples

### Using React Router

```jsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();
  
  // Simple navigation
  const handleClick = () => {
    navigate("/available-doctors");
  };
  
  // Navigation with state
  const bookAppointment = (doctor) => {
    navigate("/book-appointment", { state: { doctor } });
  };
  
  // Navigation with redirect
  const goBack = () => {
    navigate(-1);  // Go back one page
  };
}
```

### Using NavLink (in Sidebar)

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/dashboard" className="menu-item">
  Dashboard
</NavLink>

<NavLink to="/available-doctors" className="menu-item">
  Available Doctors
</NavLink>
```

---

## 🎯 Common Patterns

### Loading State Pattern
```jsx
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  setIsLoading(true);
  // Fetch data
  setTimeout(() => setIsLoading(false), 2000);
}, []);

return (
  <>
    {isLoading ? (
      <Loader type="ring" message="Loading..." />
    ) : (
      // Content
    )}
  </>
);
```

### Filtering Pattern
```jsx
const [active, setActive] = useState("all");
const [search, setSearch] = useState("");

const filtered = doctorsData.filter((doctor) => {
  return (
    (active === "all" || doctor.specialty === active) &&
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );
});
```

### Form Handling Pattern
```jsx
const [form, setForm] = useState({
  email: "",
  password: ""
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Submit form
};
```

---

## 🎨 Color Scheme

```css
--primary: #0aa3b5        /* Teal - Main brand color */
--secondary: #0284c7      /* Blue - Accent color */
--background: #f1f6f9     /* Light gray - Page background */
--surface: #ffffff        /* White - Card/component background */
--text-dark: #0f172a      /* Dark navy - Main text */
--text-muted: #64748b     /* Gray - Secondary text */
--border: #dbe7ee         /* Light gray - Borders */
--success: #10b981        /* Green - Success states */
--error: #ef4444          /* Red - Error states */
--warning: #f59e0b        /* Orange - Warning states */
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
/* Base: 320px - 480px */
@media (min-width: 481px) {
  /* Tablet: 481px - 768px */
}

@media (min-width: 769px) {
  /* Desktop: 769px - 1024px */
}

@media (min-width: 1025px) {
  /* Large Desktop: 1025px+ */
}
```

---

## 🔧 Common CSS Classes

| Class | Purpose |
|-------|---------|
| `.dashboard-page` | Main page container |
| `.dashboard-card` | Card container |
| `.btn` | Button base |
| `.btn-primary` | Primary button |
| `.btn-secondary` | Secondary button |
| `.status` | Status badge |
| `.status.confirmed` | Confirmed status |
| `.status.applied` | Applied status |
| `.status.completed` | Completed status |
| `.status.cancelled` | Cancelled status |
| `.menu-item` | Sidebar menu item |
| `.menu-item.active` | Active menu item |
| `.loader-container` | Loader wrapper |
| `.specialty-btn` | Filter button |
| `.specialty-btn.active` | Active filter button |

---

## 🔍 Debugging Tips

### Check Loading State
```jsx
console.log("Is Loading:", isLoading);
console.log("State:", state);
```

### Verify Route
```jsx
const location = useLocation();
console.log("Current route:", location.pathname);
```

### Test Loader Types
Visit `/loader-demo` to preview all 6 loader animations

### Browser DevTools
- Open DevTools: `F12` or `Right Click → Inspect`
- React DevTools: Install browser extension
- Check Network tab for API calls

---

## 📋 Common Imports

```jsx
// React & Routing
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import Loader from "../components/Loader";
import DoctorCard from "../components/DoctorCard";
import Sidebar from "../components/Sidebar";

// Styles
import "../styles/pages/PatientDashboard.css";
import "../styles/components/Loader.css";

// Framer Motion
import { motion, useInView } from "framer-motion";
```

---

## ⚡ Performance Tips

1. **Lazy Load Components**
   ```jsx
   import { lazy, Suspense } from "react";
   const PatientDashboard = lazy(() => import("./PatientDashboard"));
   
   <Suspense fallback={<Loader />}>
     <PatientDashboard />
   </Suspense>
   ```

2. **Memoize Components**
   ```jsx
   import { memo } from "react";
   const DoctorCard = memo(function DoctorCard({ doctor }) {
     // Component
   });
   ```

3. **Use useCallback**
   ```jsx
   const handleFilter = useCallback(() => {
     // Filter logic
   }, [dependencies]);
   ```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Loader not showing | Check `isLoading` state, ensure Loader component is imported |
| Route not working | Verify path in App.jsx routes, check NavLink `to` prop |
| Styles not applying | Check CSS import path, clear browser cache |
| State not updating | Use `setState((prev) => ...)` for dependent updates |
| Navigation failing | Ensure `useNavigate()` is in component, not in utility |

---

## 📚 Documentation Files

- **PROJECT_DOCUMENTATION.md** - Complete project overview
- **COMMENTS_GUIDE.md** - Comment and documentation standards
- **README.md** - Project setup and overview

---

## � Session Management

### Session Credentials
```
Patient User:
- Username: admin
- Password: admin123
- Role: PATIENT

Doctor User:
- Username: doctor
- Password: doctor123
- Role: DOCTOR
```

### Using Authentication

```javascript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, userRole, logout } = useAuth();

  if (!isAuthenticated) return <div>Not logged in</div>;

  return (
    <>
      <p>Welcome, {user?.name}!</p>
      <p>Role: {userRole}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
```

### Session Features
- ✅ Unique session ID generation per login
- ✅ Session persistence across page refreshes
- ✅ Auto-login when session valid
- ✅ Complete cleanup on logout
- ✅ Role-based menu customization
- ✅ Protected route access control

### Session Storage
localStorage keys:
- `sessionId` - Current session ID
- `sessionStartTime` - When session started
- `user` - User object (name, email, role)
- `userRole` - "PATIENT" or "DOCTOR"

### Session ID Format
```
SESSION_{timestamp}_{randomString}_{userAgent}
SESSION_1703024156789_a3f9x2k_18
```

### Protected vs Public Routes

**Protected** (requires login):
- `/dashboard`, `/available-doctors`, `/medical-reports`, `/payments`, `/settings`, `/profile`

**Public** (no login needed):
- `/signin`, `/signup`, `/loader-demo`

---

## 🚀 Next Steps


1. **API Integration** - Replace mock data with real API calls
2. **Authentication** - Implement JWT token handling
3. **Error Handling** - Add error boundaries and logging
4. **Testing** - Add unit and integration tests
5. **Optimization** - Lazy loading, code splitting, caching
6. **Deployment** - Build and deploy to production

---

**Last Updated:** January 26, 2026
