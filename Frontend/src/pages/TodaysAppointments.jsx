/**
 * Today's Appointments Page
 * 
 * Displays all appointments scheduled for today with detailed information.
 * Shows:
 * - Complete list of today's appointments
 * - Doctor details (name, specialization)
 * - Patient information
 * - Appointment time and status
 * - Consultation fees
 * 
 * Features:
 * - Full appointment list view
 * - Status badges (BOOKED, COMPLETED, CONFIRMED, CANCELLED)
 * - Responsive design
 * - Empty state handling
 * - Appointment details in a table format
 * 
 * Props: None (uses hardcoded data - replace with API when ready)
 * 
 * Dependencies:
 * - useState and useEffect hooks
 * - CSS styling
 * 
 * TODO: Replace hardcoded data with API calls
 */

import { useEffect, useState } from "react";
import "../styles/pages/TodaysAppointments.css";

function TodaysAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hardcoded appointments data (from appointments table)
    const allAppointments = [
      {
        id: 1,
        doctor_id: 101,
        doctor_name: "Dr. Sarah Johnson",
        patient_id: 201,
        patient_name: "John Doe",
        specialization: "Cardiology",
        scheduled_at: "2026-01-25 14:45:00",
        status: "completed",
        consultation_fee: 150,
      },
      {
        id: 2,
        doctor_id: 102,
        doctor_name: "Dr. Emily Roberts",
        patient_id: 202,
        patient_name: "Emily Clark",
        specialization: "Dermatology",
        scheduled_at: "2026-01-21 13:00:00",
        status: "booked",
        consultation_fee: 100,
      },
      {
        id: 3,
        doctor_id: 103,
        doctor_name: "Dr. Michael Chen",
        patient_id: 203,
        patient_name: "Natasha Tan",
        specialization: "General Practice",
        scheduled_at: "2026-01-26 13:45:00",
        status: "booked",
        consultation_fee: 75,
      },
      {
        id: 4,
        doctor_id: 104,
        doctor_name: "Dr. Lisa Anderson",
        patient_id: 204,
        patient_name: "Wendy Smith",
        specialization: "Neurology",
        scheduled_at: "2026-01-26 14:30:00",
        status: "booked",
        consultation_fee: 125,
      },
      {
        id: 5,
        doctor_id: 101,
        doctor_name: "Dr. Sarah Johnson",
        patient_id: 205,
        patient_name: "James Wilson",
        specialization: "Cardiology",
        scheduled_at: "2026-01-26 15:15:00",
        status: "confirmed",
        consultation_fee: 150,
      },
      {
        id: 6,
        doctor_id: 105,
        doctor_name: "Dr. David Brown",
        patient_id: 206,
        patient_name: "Robert Taylor",
        specialization: "Orthopedics",
        scheduled_at: "2026-01-24 10:00:00",
        status: "cancelled",
        consultation_fee: 120,
      },
      {
        id: 7,
        doctor_id: 102,
        doctor_name: "Dr. Emily Roberts",
        patient_id: 207,
        patient_name: "Alice Johnson",
        specialization: "Dermatology",
        scheduled_at: "2026-01-20 11:00:00",
        status: "completed",
        consultation_fee: 100,
      },
      {
        id: 8,
        doctor_id: 103,
        doctor_name: "Dr. Michael Chen",
        patient_id: 208,
        patient_name: "Mark Davis",
        specialization: "General Practice",
        scheduled_at: "2026-01-19 15:00:00",
        status: "completed",
        consultation_fee: 75,
      },
    ];

    // Filter for today's appointments
    const today = new Date().toISOString().split('T')[0];
    const todayAppts = allAppointments
      .filter(appt => appt.scheduled_at.startsWith(today))
      .map(appt => ({
        id: appt.id,
        doctor_name: appt.doctor_name,
        patient_name: appt.patient_name,
        specialization: appt.specialization,
        time: new Date(appt.scheduled_at).toLocaleTimeString('en-US', { 
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        status: appt.status,
        fee: appt.consultation_fee,
      }));

    setAppointments(todayAppts);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'booked':
        return '#00BCD4';
      case 'completed':
        return '#4CAF50';
      case 'confirmed':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <div className="todays-appointments-page">
      <div className="appointments-header">
        <h1>Today's Appointments</h1>
        <p className="appointment-count">{appointments.length} appointments scheduled</p>
      </div>

      {isLoading ? (
        <div className="loading">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="empty-state">
          <p>No appointments scheduled for today</p>
        </div>
      ) : (
        <div className="appointments-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Patient</th>
                <th>Status</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="appointment-row">
                  <td className="time-cell">{appt.time}</td>
                  <td className="doctor-cell">{appt.doctor_name}</td>
                  <td className="specialization-cell">{appt.specialization}</td>
                  <td className="patient-cell">{appt.patient_name}</td>
                  <td className="status-cell">
                    <span 
                      className={`status-badge status-${appt.status}`}
                      style={{ backgroundColor: getStatusColor(appt.status) }}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="fee-cell">${appt.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TodaysAppointments;
