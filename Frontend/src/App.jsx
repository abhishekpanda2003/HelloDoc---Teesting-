/**
 * Main App Component - HelloDoc Application Router
 * 
 * This is the root component that sets up:
 * - React Router for navigation
 * - AuthProvider for authentication and session management
 * - Route definitions for all pages
 * - Role-based dashboard selection (PATIENT or DOCTOR)
 * - Layout wrapper for authenticated routes
 * 
 * Routes:
 * - /signin, /signup: Authentication pages (no layout)
 * - /dashboard: Role-based (Patient or Doctor)
 * - /available-doctors, /book-appointment, /medical-reports, /payments, /settings, /profile: With layout
 * - /loader-demo: Component demo page
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Layout from "./layout/Layout";

import SignIn from "./pages/SignIn";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import AvailableDoctors from "./pages/AvailableDoctors";
import BookAppointment from "./pages/BookAppointment";
import MedicalReports from "./pages/MedicalReports";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LoaderDemo from "./pages/LoaderDemo";
import TodaysAppointments from "./pages/TodaysAppointments";

// Protected Routes Component
function ProtectedRoutes() {
  const { isAuthenticated, isLoading, userRole } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <Routes>
      <Route element={<Layout userRole={userRole} />}>
          <Route
            path="/dashboard"
            element={
              userRole === "DOCTOR" ? (
                <DoctorDashboard />
              ) : (
                <PatientDashboard />
              )
            }
          />

          <Route path="/available-doctors" element={<AvailableDoctors />} />
          <Route path="/todays-appointments" element={<TodaysAppointments />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/medical-reports" element={<MedicalReports />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/loader-demo" element={<LoaderDemo />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
