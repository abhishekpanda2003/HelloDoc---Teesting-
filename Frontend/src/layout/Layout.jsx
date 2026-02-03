/**
 * Layout Component - Wrapper for Authenticated Pages
 * 
 * Provides consistent layout structure for all authenticated routes.
 * Includes sidebar navigation and page header.
 * 
 * Layout Structure:
 * - Sidebar: Left navigation menu (toggleable on mobile)
 * - Top Header: Page title and mobile menu button
 * - Content Area: Dynamic page content via React Router <Outlet />
 * 
 * Features:
 * - Responsive sidebar toggle (mobile menu button)
 * - Sidebar overlay on mobile (closes menu when clicked)
 * - Dynamic page title based on route
 * - Smooth sidebar transitions
 * 
 * Page Title Mapping:
 * - /dashboard: "Dashboard"
 * - /available-doctors: "Available Doctors"
 * - /book-appointment: "Book Appointment"
 * - /medical-reports: "Medical Reports"
 * - /payments: "Payments"
 * - /settings: "Settings"
 * - /profile: "My Profile"
 * 
 * Routes Using This Layout:
 * All authenticated routes wrapped in <Layout>
 * Routes WITHOUT layout: /signin, /signup, /loader-demo
 * 
 * Dependencies:
 * - React Router (Outlet, useLocation)
 * - Sidebar component
 * - Global CSS styles
 * 
 * State:
 * - sidebarOpen: Boolean to track sidebar visibility on mobile
 */

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";

function Layout({ userRole = "PATIENT" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { userRole: authUserRole } = useAuth();

  // Use userRole from auth context, fallback to prop
  const currentUserRole = authUserRole || userRole;

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/available-doctors": "Available Doctors",
    "/book-appointment": "Book Appointment",
    "/medical-reports": "Medical Reports",
    "/payments": "Payments",
    "/settings": "Settings",
    "/profile": "My Profile",
  };

  const title = pageTitles[location.pathname] || "";

  return (
    <div className="layout">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={currentUserRole} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="content">
        {/* GLOBAL HEADER */}
        <div className="top-header global-header">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h1 className="page-title">{title}</h1>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
