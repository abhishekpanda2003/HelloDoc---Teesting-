/**
 * Specialty Filter Component
 * 
 * Filter buttons for selecting medical specialties.
 * Used in the AvailableDoctors page to filter doctors by specialty.
 * 
 * Props:
 * - active: Currently selected specialty (string)
 *   Special value "all" shows all doctors regardless of specialty
 * - setActive: Function to update selected specialty
 * 
 * Available Specialties:
 * - all (default): Show all doctors
 * - cardiologist: Heart and cardiovascular specialists
 * - dermatologist: Skin specialists
 * - pediatrician: Child health specialists
 * - neurologist: Nervous system specialists
 * - oncologist: Cancer specialists
 * - nephrologist: Kidney specialists
 * 
 * Features:
 * - Button-based filter interface
 * - Active button highlighting
 * - Case-insensitive display (capitalizes first letter)
 * - Real-time filtering
 * 
 * Styling:
 * - Horizontal button layout
 * - Active state indication
 * - Hover effects
 * - Scrollable on mobile
 * 
 * TODO: Load specialties dynamically from API instead of hardcoded list
 */

import "../styles/components/SpecialtyFilter.css";

function SpecialtyFilter({ active, setActive }) {
  const specialties = [
    "all",
    "cardiologist",
    "dermatologist",
    "pediatrician",
    "neurologist",
    "oncologist",
    "nephrologist",
  ];

  return (
    <div className="specialty-navbar">
      {specialties.map((s) => (
        <button
          key={s}
          className={`specialty-btn ${active === s ? "active" : ""}`}
          onClick={() => setActive(s)}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default SpecialtyFilter;
