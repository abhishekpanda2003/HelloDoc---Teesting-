/**
 * Book Appointment Page
 * 
 * Multi-step appointment booking workflow for patients.
 * 
 * Features:
 * - Step 1: Select date and time from doctor's availability
 * - Step 2: Confirm booking with appointment details
 * - Doctor data passed from AvailableDoctors page via navigation state
 * - Appointment type selection (In-person, Online, Home Visit)
 * - Displays doctor details, consultation fee, location, rating
 * - Loading animation during booking submission
 * - Error and success message handling
 * 
 * Data Structure:
 * - Receives doctor object from AvailableDoctors page
 * - Dummy doctor, specialization, and availability data
 * - Ready for API integration
 * 
 * State:
 * - step: Current booking step (1 or 2)
 * - selectedDate, selectedTime: Appointment scheduling
 * - appointmentType: Consultation type
 * - loading, error, success: Status and messaging
 * 
 * Dependencies:
 * - Loader component for booking status
 * - React Router for navigation and state passing
 * - BookAppointment.css for styling
 * 
 * TODO: Connect to backend API for booking submission
 */

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/pages/BookAppointment.css";

function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Select Date/Time, Step 2: Confirm
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // DUMMY DATA
  const dummyDoctors = [
    {
      doctor_id: 1,
      consultation_fee: 500,
      location: "Apollo Hospital, Mumbai",
      rating: 4.8,
      user: { name: "Dr. James Anderson", email: "james@apollo.com" },
    },
    {
      doctor_id: 2,
      consultation_fee: 600,
      location: "Max Healthcare, Delhi",
      rating: 4.7,
      user: { name: "Dr. Maria Hernandez", email: "maria@max.com" },
    },
    {
      doctor_id: 3,
      consultation_fee: 550,
      location: "Fortis Hospital, Bangalore",
      rating: 4.9,
      user: { name: "Dr. Sarah Williams", email: "sarah@fortis.com" },
    },
    {
      doctor_id: 4,
      consultation_fee: 700,
      location: "AIIMS, Delhi",
      rating: 4.6,
      user: { name: "Dr. Alex Smith", email: "alex@aiims.com" },
    },
    {
      doctor_id: 5,
      consultation_fee: 450,
      location: "Lilavati Hospital, Mumbai",
      rating: 4.5,
      user: { name: "Dr. Priya Sharma", email: "priya@lilavati.com" },
    },
    {
      doctor_id: 6,
      consultation_fee: 650,
      location: "Rainbow Hospital, Pune",
      rating: 4.7,
      user: { name: "Dr. Rajesh Kumar", email: "rajesh@rainbow.com" },
    },
  ];

  const dummySpecializations = {
    1: [
      { specialization: { name: "Dermatologist" }, experience_years: 12 },
    ],
    2: [
      { specialization: { name: "Pediatrician" }, experience_years: 15 },
    ],
    3: [
      { specialization: { name: "Cardiologist" }, experience_years: 10 },
    ],
    4: [
      { specialization: { name: "Neurologist" }, experience_years: 18 },
    ],
    5: [
      { specialization: { name: "Ophthalmologist" }, experience_years: 8 },
      { specialization: { name: "General Physician" }, experience_years: 12 },
    ],
    6: [
      { specialization: { name: "Orthopedic" }, experience_years: 14 },
    ],
  };

  const dummyAvailability = [
    { day_of_week: "MONDAY", start_time: "09:00", end_time: "17:00" },
    { day_of_week: "TUESDAY", start_time: "09:00", end_time: "17:00" },
    { day_of_week: "WEDNESDAY", start_time: "09:00", end_time: "17:00" },
    { day_of_week: "THURSDAY", start_time: "09:00", end_time: "17:00" },
    { day_of_week: "FRIDAY", start_time: "09:00", end_time: "17:00" },
    { day_of_week: "SATURDAY", start_time: "10:00", end_time: "14:00" },
  ];

  // Load doctor data from navigation state or redirect
  useEffect(() => {
    // Handle edit mode
    if (location.state?.isEditMode && location.state?.editingAppointment) {
      const appointment = location.state.editingAppointment;
      setIsEditMode(true);
      setEditingAppointment(appointment);

      // Find matching doctor by name
      const foundDoctor = dummyDoctors.find(d => 
        d.user.name.toLowerCase() === appointment.doctor.toLowerCase()
      );

      if (foundDoctor) {
        setSelectedDoctor(foundDoctor.doctor_id);
        setDoctorDetails(foundDoctor);
        setSpecializations(dummySpecializations[foundDoctor.doctor_id] || []);
        setAvailability(dummyAvailability);
        
        // Pre-fill the form with appointment data
        setSelectedDate(appointment.date || "");
        setSelectedTime(appointment.time || "");
        setAppointmentType(appointment.appointmentType || "");
        setStep(2); // Go directly to confirmation for edit
      }
    } else if (location.state?.doctor) {
      const doctor = location.state.doctor;
      
      // Find matching dummy doctor by name
      const foundDoctor = dummyDoctors.find(d => 
        d.user.name.toLowerCase() === doctor.name.toLowerCase()
      );

      if (foundDoctor) {
        setSelectedDoctor(foundDoctor.doctor_id);
        setDoctorDetails(foundDoctor);
        setSpecializations(dummySpecializations[foundDoctor.doctor_id] || []);
        setAvailability(dummyAvailability);
        setStep(1); // Go to date/time selection
      }
    } else {
      // If no doctor data, redirect back to available doctors
      navigate("/available-doctors");
    }
  }, [location.state, navigate]);

  const getAvailableTimeslots = () => {
    if (!selectedDate) return [];

    const dateObj = new Date(selectedDate);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();

    const availableSlot = availability.find(
      (slot) => slot.day_of_week === dayName
    );

    if (!availableSlot) return [];

    // Generate time slots in 30-minute intervals
    const timeslots = [];
    const [startHour, startMin] = availableSlot.start_time.split(":").map(Number);
    const [endHour, endMin] = availableSlot.end_time.split(":").map(Number);

    let currentTime = new Date();
    currentTime.setHours(startHour, startMin, 0);
    const endTime = new Date();
    endTime.setHours(endHour, endMin, 0);

    while (currentTime < endTime) {
      timeslots.push(
        currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return timeslots;
  };

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctor(doctorId);
    setStep(2);
    setSelectedDate("");
    setSelectedTime("");
    setAppointmentType("");
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !appointmentType) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call with dummy data
      setTimeout(() => {
        if (isEditMode) {
          setSuccess("✓ Appointment updated successfully!");
        } else {
          setSuccess("✓ Appointment booked successfully!");
        }
        setStep(2);
        setError("");
        setLoading(false);

        // Reset form after success and redirect back to patient dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }, 1000);
    } catch (err) {
      setError(err.message);
      console.error(err);
      setLoading(false);
    }
  };

  const goBackToDoctors = () => {
    navigate("/available-doctors");
  };

  const timeslots = getAvailableTimeslots();

  return (
    <div className="book-appointment">
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* STEP 1: SELECT DATE & TIME */}
      {step === 1 && doctorDetails && (
        <div className="step-container">
          <h2>{isEditMode ? "Step 1: Edit Appointment Details" : "Step 1: Select Date & Time"}</h2>

          <div className="selected-doctor-info">
            <p>
              <strong>Selected Doctor:</strong> {doctorDetails.user?.name}
            </p>
            <p>
              <strong>Specialization:</strong>{" "}
              {specializations.map((s) => s.specialization?.name).join(", ")}
            </p>
            <p>
              <strong>Location:</strong> {doctorDetails.location}
            </p>
            <p>
              <strong>Consultation Fee:</strong> ₹{doctorDetails.consultation_fee}
            </p>
          </div>

          <div className="appointment-form">
            {/* Date Selection */}
            <div className="form-group">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(""); // Reset time when date changes
                }}
                min={new Date().toISOString().split("T")[0]}
              />
              {selectedDate && (
                <p className="available-day">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="form-group">
                <label htmlFor="time">Select Time:</label>
                {timeslots.length > 0 ? (
                  <div className="time-slots">
                    {timeslots.map((time) => (
                      <button
                        key={time}
                        className={`time-slot ${
                          selectedTime === time ? "active" : ""
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="no-slots">
                    No available slots for selected date
                  </p>
                )}
              </div>
            )}

            {/* Appointment Type */}
            <div className="form-group">
              <label htmlFor="type">Appointment Type:</label>
              <select
                id="type"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
              >
                <option value="">Select appointment type</option>
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Check-up">Check-up</option>
                <option value="Diagnosis">Diagnosis</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                className="btn btn-secondary"
                onClick={goBackToDoctors}
              >
                Back to Doctors
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setStep(2)}
                disabled={!selectedDate || !selectedTime || !appointmentType}
              >
                Continue to Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: CONFIRM APPOINTMENT */}
      {step === 2 && doctorDetails && (
        <div className="step-container">
          <h2>{isEditMode ? "Step 2: Confirm Changes" : "Step 2: Confirm Appointment"}</h2>

          <div className="confirmation-details">
            <div className="detail-box">
              <h3>{isEditMode ? "Updated Appointment Details" : "Appointment Summary"}</h3>
              {isEditMode && (
                <div className="edit-mode-notice">
                  <p>ℹ️ <strong>Note:</strong> No additional payment required. Your original payment remains valid.</p>
                </div>
              )}
              <div className="detail-row">
                <span className="label">Doctor:</span>
                <span className="value">{doctorDetails.user?.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Specialization:</span>
                <span className="value">
                  {specializations.map((s) => s.specialization?.name).join(", ")}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Location:</span>
                <span className="value">{doctorDetails.location}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Time:</span>
                <span className="value">{selectedTime}</span>
              </div>
              <div className="detail-row">
                <span className="label">Type:</span>
                <span className="value">{appointmentType}</span>
              </div>
              <div className="detail-row">
                <span className="label">Consultation Fee:</span>
                <span className="value highlight">
                  ₹{doctorDetails.consultation_fee}
                </span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              className="btn btn-secondary"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              className="btn btn-primary btn-confirm"
              onClick={handleBookAppointment}
              disabled={loading}
            >
              {loading ? (isEditMode ? "Updating..." : "Booking...") : (isEditMode ? "Confirm & Update Appointment" : "Confirm & Book Appointment")}
            </button>
          </div>
        </div>
      )}

      {/* Show loader while booking */}
      {loading && <Loader type="ring" message="Booking your appointment..." />}
    </div>
  );
}

export default BookAppointment;
