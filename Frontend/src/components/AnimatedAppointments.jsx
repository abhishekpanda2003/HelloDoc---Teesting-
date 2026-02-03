/**
 * Animated Appointments Component
 * 
 * Displays a filterable list of appointments with smooth animations.
 * Used in the PatientDashboard to show appointment history.
 * 
 * Features:
 * - Filter buttons for appointment status (ALL, CONFIRMED, APPLIED, COMPLETED, CANCELLED)
 * - Smooth entrance animations using Framer Motion
 * - Scroll-based animation triggers (InView)
 * - Real-time filtering as user selects status
 * - Displays doctor name, specialty, date, and status badge
 * 
 * Data Structure:
 * - appointments: Array of appointment objects
 *   - doctor: Doctor's name
 *   - specialty: Medical specialty
 *   - date: Appointment date
 *   - status: Appointment status (CONFIRMED, APPLIED, COMPLETED, CANCELLED)
 * 
 * Animation Details:
 * - Initial state: opacity 0, scale 0.9
 * - Animated state: opacity 1, scale 1 when in view
 * - Staggered animation based on list index
 * - 0.4 threshold for InView trigger
 * 
 * Props:
 * - appointments: Array of appointment objects (required)
 * 
 * Dependencies:
 * - Framer Motion for animations
 * - AnimatedAppointments.css for styling
 */

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../styles/components/AnimatedAppointments.css";

const AnimatedItem = ({ children, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.2 }}
      className="appointment-item-wrapper"
    >
      {children}
    </motion.div>
  );
};

function AnimatedAppointments({ appointments, onViewAppointment }) {
  const [filter, setFilter] = useState("ALL");

  const filteredAppointments =
    filter === "ALL"
      ? appointments
      : appointments.filter(a => a.status === filter);

  return (
    <div className="appointments-container">
      <div className="appointments-filters">
        {["ALL", "CONFIRMED", "APPLIED", "COMPLETED", "CANCELLED"].map(type => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? "active" : ""}`}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="appointments-list">
        {filteredAppointments.map((appt, index) => (
          <AnimatedItem key={index} index={index}>
            <div className="appointment-item">
              <div>
                <strong>{appt.doctor}</strong>
                <p>
                  {appt.specialty} • {appt.date}
                </p>
              </div>

              <div className="appointment-actions">
                <span className={`status ${appt.status.toLowerCase()}`}>
                  {appt.status}
                </span>
                <button 
                  className="view-btn"
                  onClick={() => onViewAppointment(appt)}
                >
                  View
                </button>
              </div>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </div>
  );
}

export default AnimatedAppointments;
