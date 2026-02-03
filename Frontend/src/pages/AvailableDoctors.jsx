/**
 * Available Doctors Page
 * 
 * Displays a searchable, filterable list of available doctors.
 * 
 * Features:
 * - Doctor cards with details (name, specialty, experience, location, image)
 * - Specialty filter buttons (Cardiology, Dermatology, etc.)
 * - Search by doctor name
 * - Filter by location
 * - Click "Book Now" to navigate to BookAppointment page with doctor data
 * - Loading state with ring loader animation
 * - Responsive grid layout
 * 
 * Filtering:
 * - Combines specialty, search, and location filters
 * - Real-time filtering as user types or selects
 * - Shows "No doctors found" message when no results
 * 
 * Dependencies:
 * - DoctorCard component for displaying individual doctors
 * - SpecialtyFilter component for specialty selection
 * - Loader component for loading state
 * - React Router navigation
 * - Mock doctor data (replace with API calls)
 */

import { useState, useEffect } from "react";
import DoctorCard from "../components/DoctorCard";
import SpecialtyFilter from "../components/SpecialtyFilter";
import Loader from "../components/Loader";
import "../styles/pages/AvailableDoctors.css";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Williams",
    specialty: "cardiologist",
    experience: 12,
    location: "New York",
    image: "https://images.pexels.com/photos/532483/pexels-photo-532483.jpeg",
  },
  {
    id: 2,
    name: "Dr. James Anderson",
    specialty: "dermatologist",
    experience: 8,
    location: "Los Angeles",
    image: "https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg",
  },
  {
    id: 3,
    name: "Dr. Maria Hernandez",
    specialty: "pediatrician",
    experience: 9,
    location: "Chicago",
    image: "https://images.pexels.com/photos/3985150/pexels-photo-3985150.jpeg",
  },
];

function AvailableDoctors() {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Loader will only show during actual network requests (e.g., API calls)
  // Remove this comment once connected to real backend

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchSpecialty =
      active === "all" || doctor.specialty === active;

    const matchSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase());

    const matchLocation =
      doctor.location.toLowerCase().includes(location.toLowerCase());

    return matchSpecialty && matchSearch && matchLocation;
  });

  return (
    <>
      {isLoading ? (
        <Loader type="ring" message="Fetching doctors..." />
      ) : (
        <div className="dashboard-page">
          {/* PAGE CONTROLS (NO TITLE HERE) */}
          <div className="dashboard-sticky">
            <div className="page-header-row">
              <div /> {/* empty left column – title comes from Layout */}
              <div className="page-header-actions">
                <input
                  type="text"
                  placeholder="Search doctor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <SpecialtyFilter active={active} setActive={setActive} />
          </div>

          {/* CONTENT */}
          <div className="dashboard-scroll">
            <div className="doctor-list">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AvailableDoctors;
