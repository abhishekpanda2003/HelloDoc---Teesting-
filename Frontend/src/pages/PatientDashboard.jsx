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

import AnimatedAppointments from "../components/AnimatedAppointments";
import Loader from "../components/Loader";
import "../styles/pages/PatientDashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const patientName = "Abhishek";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. James Anderson",
      specialty: "Dermatologist",
      date: "22 Aug",
      status: "CONFIRMED",
    },
    {
      id: 2,
      doctor: "Dr. Maria Hernandez",
      specialty: "Pediatrician",
      date: "29 Aug",
      status: "APPLIED",
    },
    {
      id: 3,
      doctor: "Dr. Sarah Williams",
      specialty: "Cardiologist",
      date: "10 Aug",
      status: "COMPLETED",
    },
    {
      id: 4,
      doctor: "Dr. Alex Smith",
      specialty: "Neurologist",
      date: "02 Aug",
      status: "CANCELLED",
    },
  ]);

  // Loader will only show during actual network requests (e.g., API calls)
  // Remove this comment once connected to real backend

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.id === appointmentId
          ? { ...appt, status: "CANCELLED" }
          : appt
      )
    );
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.filter(appt => appt.id !== appointmentId)
    );
    setSelectedAppointment(null);
  };

  const handleEditAppointment = (appointmentId) => {
    const appointmentToEdit = appointments.find(appt => appt.id === appointmentId);
    if (appointmentToEdit) {
      navigate("/book-appointment", { 
        state: { 
          editingAppointment: appointmentToEdit,
          isEditMode: true 
        } 
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader type="ring" message="Loading your dashboard..." />
      ) : (
        <div className="dashboard-page">
          <div className="dashboard-card" style={{ marginBottom: "24px" }}>
          <h3>
            Hello, {patientName} <span role="img" aria-label="wave">👋</span>
          </h3>
          <p style={{ color: "#64748b", marginTop: "6px" }}>
            Here’s a quick look at your health activity
          </p>
        </div>

        {/* NEXT APPOINTMENT */}
        <div className="dashboard-card" style={{ marginBottom: "24px" }}>
          <h3 className="dashboard-card-title">Your next appointment</h3>

          <div className="appointment-item">
            <div>
              <strong>Dr. Sarah Williams</strong>
              <p>Cardiologist • Tomorrow, 10:30 AM</p>
            </div>
            <span className="status confirmed">CONFIRMED</span>
          </div>
        </div>

        {/* ALL APPOINTMENTS */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Appointments</h3>
          <AnimatedAppointments 
            appointments={appointments}
            onViewAppointment={handleViewAppointment}
          />
        </div>

        {/* APPOINTMENT DETAIL MODAL */}
        {selectedAppointment && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Appointment Details</h2>
                <button className="modal-close" onClick={handleCloseModal}>✕</button>
              </div>

              <div className="modal-body">
                <div className="detail-row">
                  <label>Doctor:</label>
                  <span>{selectedAppointment.doctor}</span>
                </div>
                <div className="detail-row">
                  <label>Specialty:</label>
                  <span>{selectedAppointment.specialty}</span>
                </div>
                <div className="detail-row">
                  <label>Date:</label>
                  <span>{selectedAppointment.date}</span>
                </div>
                <div className="detail-row">
                  <label>Status:</label>
                  <span className={`status ${selectedAppointment.status.toLowerCase()}`}>
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                {selectedAppointment.status === "APPLIED" && (
                  <button 
                    className="btn btn-edit"
                    onClick={() => handleEditAppointment(selectedAppointment.id)}
                  >
                    Edit
                  </button>
                )}
                {(selectedAppointment.status === "CONFIRMED" || selectedAppointment.status === "APPLIED") && (
                  <button 
                    className="btn btn-cancel"
                    onClick={() => 
                      selectedAppointment.status === "CONFIRMED"
                        ? handleCancelAppointment(selectedAppointment.id)
                        : handleDeleteAppointment(selectedAppointment.id)
                    }
                  >
                    {selectedAppointment.status === "CONFIRMED" ? "Cancel" : "Delete"}
                  </button>
                )}
                <button 
                  className="btn btn-close"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      )}
    </>
  );
}

export default PatientDashboard;
