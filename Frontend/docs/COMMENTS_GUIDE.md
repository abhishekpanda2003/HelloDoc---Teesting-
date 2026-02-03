# Code Comments Guide - HelloDoc Frontend

## Overview

This document outlines the commenting standards used throughout the HelloDoc frontend codebase.

---

## 1. File-Level JSDoc Comments

Every JavaScript/JSX file should start with a comprehensive JSDoc block describing:
- **Purpose**: What the file does
- **Features**: Key functionality
- **Props**: For components (if applicable)
- **Dependencies**: External libraries and imports
- **TODO**: Future improvements

### **Example - Component File:**
```jsx
/**
 * Doctor Card Component
 * 
 * Displays a single doctor's information in a card format.
 * Used in the AvailableDoctors page to show doctor list.
 * 
 * Props:
 * - doctor: Object containing doctor details
 *   - id: Doctor unique identifier
 *   - name: Doctor's full name
 *   - specialty: Medical specialty
 *   - experience: Years of experience
 *   - location: Practice location/city
 *   - image: URL to doctor's profile image
 * 
 * Functionality:
 * - Displays doctor's image with fallback
 * - Shows doctor details in readable format
 * - "Book Now" button navigates to BookAppointment page
 * - Passes doctor object via React Router state
 * 
 * Styling:
 * - Card-based layout with hover effects
 * - Responsive image sizing
 * - Button styling consistent with app theme
 * 
 * Dependencies:
 * - React Router useNavigate hook
 * - DoctorCard.css (imported in parent)
 */
```

### **Example - Page File:**
```jsx
/**
 * Patient Dashboard Page
 * 
 * Main page for patients showing:
 * - Welcome message with patient name
 * - Next scheduled appointment details
 * - List of all appointments with status filtering
 * - Animated appointment list with FilterButtons
 * 
 * Features:
 * - Loading state with ring loader animation
 * - Dummy appointment data (replace with API calls)
 * - Responsive card-based layout
 * - Status badges (CONFIRMED, APPLIED, COMPLETED, CANCELLED)
 * 
 * Props: None (uses internal state and mock data)
 * 
 * Dependencies:
 * - AnimatedAppointments component for appointment list
 * - Loader component for loading state
 * - PatientDashboard.css for styling
 */
```

---

## 2. CSS File Comments

CSS files use section-based comments to organize code:

### **Format:**
```css
/* =========================================================
   SECTION NAME
   Used by: Component/Page name
   Purpose: Brief description
   ========================================================= */
```

### **Example:**
```css
/* =========================================================
   LOADER CONTAINER
   Used by: Loader.jsx
   Purpose:
   - Centered overlay container
   - Flexible sizing based on animation type
   ========================================================= */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f1f6f9 0%, #e8f2f7 100%);
  width: 100%;
}
```

---

## 3. Inline Code Comments

Use inline comments sparingly for complex logic:

### **DO:**
```jsx
// Check if user has admin role
if (userRole === "ADMIN") {
  showDeleteOption();
}

// Simulate loading delay for demo
setTimeout(() => setIsLoading(false), 2000);
```

### **DON'T:**
```jsx
// Set the role variable
const role = "ADMIN";

// Increment the counter
count++;
```

---

## 4. State & Hook Comments

Document important state variables and their purposes:

```jsx
// Track whether data is being fetched from API
const [isLoading, setIsLoading] = useState(false);

// Store selected appointment date (format: YYYY-MM-DD)
const [selectedDate, setSelectedDate] = useState("");

// Manage multi-step booking workflow (step 1 or 2)
const [step, setStep] = useState(1);
```

---

## 5. Complex Logic Comments

Add comments before complex logic blocks:

```jsx
// Calculate total fee including taxes
const taxRate = 0.1; // 10% tax
const totalFee = consultationFee * (1 + taxRate);

// Filter doctors by multiple criteria: specialty, search, location
const filteredDoctors = doctorsData.filter((doctor) => {
  const matchSpecialty = active === "all" || doctor.specialty === active;
  const matchSearch = doctor.name.toLowerCase().includes(search.toLowerCase());
  const matchLocation = doctor.location.toLowerCase().includes(location.toLowerCase());
  
  return matchSpecialty && matchSearch && matchLocation;
});
```

---

## 6. TODO Comments

Mark incomplete features with TODO comments:

```jsx
// TODO: Replace hardcoded credentials with API authentication
if (username === "admin" && password === "admin123") {
  navigate("/dashboard");
}

// TODO: Add email verification step
// TODO: Connect to backend API for registration
// TODO: Implement two-factor authentication
```

---

## 7. Data Structure Comments

Comment complex data objects:

```jsx
// Doctor object structure from API
const doctor = {
  id: 1,
  name: "Dr. Sarah Williams",
  specialty: "cardiologist",    // Medical specialty
  experience: 12,                // Years of experience
  location: "New York",          // Practice location
  image: "https://...",          // Profile image URL
  consultationFee: 500,          // Fee in currency units
  rating: 4.8,                   // Out of 5.0
};

// Appointment object structure
const appointment = {
  doctor: "Dr. James Anderson",
  specialty: "Dermatologist",
  date: "22 Aug",
  status: "CONFIRMED"            // CONFIRMED | APPLIED | COMPLETED | CANCELLED
};
```

---

## 8. Function Comments

Document function purposes and parameters:

```jsx
/**
 * Filters doctors based on specialty, search term, and location
 * 
 * @param {Array} doctors - List of doctor objects
 * @param {String} specialty - Selected specialty ("all" for no filter)
 * @param {String} searchTerm - Name search term
 * @param {String} location - Location filter
 * @returns {Array} Filtered list of doctors
 */
function filterDoctors(doctors, specialty, searchTerm, location) {
  // Implementation
}
```

---

## 9. API Integration Comments

Mark areas where API calls will be needed:

```jsx
// MOCK DATA - Replace with API call in production
const dummyDoctors = [
  { id: 1, name: "Dr. Sarah Williams", ... },
  // ...
];

// TODO: Connect to /api/doctors endpoint
useEffect(() => {
  // fetchDoctors().then(setDoctors);
}, []);
```

---

## 10. Conditional/Warning Comments

Highlight important conditions:

```jsx
// Auto-hide loader after 3 seconds
setTimeout(() => setActiveLoader(null), 3000);

// IMPORTANT: This closes the sidebar on mobile
onClick={() => setSidebarOpen(false)}

// WARNING: This will delete all user data permanently
const handleDeleteAccount = () => { ... }
```

---

## 11. CSS Class Naming Comments

Document CSS classes in component files:

```jsx
// className="dashboard-page" - Main page container (see PatientDashboard.css)
// className="dashboard-card" - Card container with white bg and shadow
// className="status confirmed" - Status badge for confirmed appointments
<div className="dashboard-page">
  <div className="dashboard-card">
    <span className="status confirmed">CONFIRMED</span>
  </div>
</div>
```

---

## 12. Comments About Designs/Patterns

Document architectural decisions:

```jsx
// Using React Router state to pass doctor data between pages
// instead of Context API to keep components loosely coupled
navigate("/book-appointment", { state: { doctor } });

// Fragment wrapper needed to satisfy React return single element requirement
// while keeping conditional rendering clean
return (
  <>
    {isLoading ? <Loader /> : <MainContent />}
  </>
);
```

---

## 13. Browser/Library Compatibility

Comment version-specific code:

```jsx
// React 18+ only (supports concurrent features)
const [isLoading, setIsLoading] = useState(false);

// Framer Motion useInView hook
const inView = useInView(ref, { amount: 0.4 });
```

---

## Comment Best Practices

### ✅ DO:
- Comment **WHY**, not **WHAT**
- Keep comments up-to-date with code changes
- Use clear, professional language
- Group related comments together
- Use TODO for incomplete features
- Document assumptions and constraints
- Add comments before complex algorithms

### ❌ DON'T:
- Redundant comments that repeat the code
- Commenting every single line
- Outdated or misleading comments
- Grammatically incorrect comments
- All-caps comments (except for emphasis)
- Overly long comment blocks

---

## Example: Fully Commented Component

```jsx
/**
 * Loader Component - Reusable Loading Animation
 * 
 * A flexible loading spinner with multiple animation styles.
 * Used throughout the application to indicate loading states.
 * 
 * Animation Types:
 * 1. "spinner" (default): Classic rotating circle spinner
 * 2. "pulse": Pulsing dot with fade in/out effect
 * 3. "dots": Three bouncing dots animation
 * 4. "gradient": Rotating gradient ring with color transitions
 * 5. "wave": Five staggered wave bars
 * 6. "ring": Three concentric rotating rings (CHOSEN FOR PRODUCTION)
 * 
 * Props:
 * - type: Animation type (default: "spinner")
 *   Valid values: "spinner" | "pulse" | "dots" | "gradient" | "wave" | "ring"
 * - message: Optional loading message text (default: "Loading...")
 *   Pass empty string to hide message
 * 
 * Usage:
 * <Loader />
 * <Loader type="ring" message="Loading your dashboard..." />
 * <Loader type="wave" />
 */

import "../styles/components/Loader.css";

function Loader({ type = "spinner", message = "Loading..." }) {
  const renderLoader = () => {
    // Return appropriate animation based on type prop
    switch (type) {
      case "pulse":
        return <div className="pulse-loader"></div>;
        
      case "dots":
        // Three bouncing dots
        return (
          <div className="dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
        
      case "ring":
        // Three concentric rotating rings
        return (
          <div className="ring-loader">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
          </div>
        );
        
      case "spinner":
      default:
        // Classic rotating circle
        return <div className="spinner"></div>;
    }
  };

  return (
    <div className="loader-container">
      <div className="loader-content">
        {renderLoader()}
        {/* Show message if provided */}
        {message && <p className="loader-text">{message}</p>}
      </div>
    </div>
  );
}

export default Loader;
```

---

## Conclusion

Well-commented code is:
- **Easier to understand** - Future developers (including yourself) can quickly grasp the code's intent
- **Easier to maintain** - Changes are less likely to introduce bugs
- **Easier to debug** - Comments highlight assumptions and expected behavior
- **Professional** - Shows code quality and attention to detail

Remember: Good code explains itself, great code explains **why** it does what it does.
