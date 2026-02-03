/**
 * Sidebar Navigation Component
 * 
 * Main navigation menu for authenticated users.
 * Displays different menu items based on user role.
 * 
 * Menu Structure:
 * MAIN Section:
 *   - Dashboard (role-based: Patient or Doctor)
 *   - Available Doctors
 *   - Medical Reports
 *   - Payments
 * 
 * ACCOUNT Section:
 *   - Settings
 *   - My Profile
 *   - Logout
 * 
 * Props:
 * - sidebarOpen: Boolean indicating if sidebar is open on mobile
 * - setSidebarOpen: Function to toggle sidebar visibility
 * 
 * Features:
 * - NavLink with active state styling
 * - Responsive: Closes on mobile after navigation
 * - Logo with icon and app name
 * - Organized menu sections (MAIN and ACCOUNT)
 * - Mobile toggle button integration
 * 
 * Styling:
 * - Modern sidebar design
 * - Active link highlighting
 * - Smooth transitions
 * - Mobile responsive with overlay
 * 
 * TODO: Add dynamic menu items based on user role
 */

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AnimatedLogoutButton from "./AnimatedLogoutButton";

function Sidebar({ sidebarOpen, setSidebarOpen, userRole = "PATIENT" }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    console.log("✅ Session expired - User logged out");
    navigate("/signin");
  };

  return (
    <aside className={`modern-sidebar ${sidebarOpen ? "open" : ""}`}>
      <div>
        <div className="logo">
          <span className="logo-icon">🩺</span>
          <h2>HelloDoc</h2>
        </div>

        <div className="menu-section">
          <p className="menu-title">MAIN</p>

          <NavLink to="/dashboard" end className="menu-item" onClick={() => setSidebarOpen(false)}>
            Dashboard
          </NavLink>

          {/* Show Today's Appointments only for DOCTOR role */}
          {userRole === "DOCTOR" && (
            <NavLink
              to="/todays-appointments"
              className="menu-item"
              onClick={() => setSidebarOpen(false)}
            >
              Today's Appointments
            </NavLink>
          )}

          {/* Show these items only for PATIENT role */}
          {userRole === "PATIENT" && (
            <>
              <NavLink
                to="/available-doctors"
                className="menu-item"
                onClick={() => setSidebarOpen(false)}
              >
                Available Doctors
              </NavLink>

              <NavLink
                to="/medical-reports"
                className="menu-item"
                onClick={() => setSidebarOpen(false)}
              >
                Medical Reports
              </NavLink>

              <NavLink
                to="/payments"
                className="menu-item"
                onClick={() => setSidebarOpen(false)}
              >
                Payments
              </NavLink>
            </>
          )}
        </div>

        <div className="menu-section">
          <p className="menu-title">ACCOUNT</p>

          <NavLink
            to="/settings"
            className="menu-item"
            onClick={() => setSidebarOpen(false)}
          >
            Settings
          </NavLink>

          <AnimatedLogoutButton onLogout={handleLogout} theme="dark" />
        </div>
      </div>

      {/* USER PROFILE (CLICKABLE) */}
      <div
        className="user-card clickable"
        onClick={() => {
          setSidebarOpen(false);
          navigate("/profile");
        }}
      >
        <img src="https://i.pravatar.cc/100" alt="User" />
        <strong>{user?.name || "User"}</strong>
      </div>
    </aside>
  );
}

export default Sidebar;
