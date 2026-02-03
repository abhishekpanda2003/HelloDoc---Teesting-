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
 *   - specialty: Medical specialty (cardiologist, dermatologist, etc.)
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

import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book-appointment", { state: { doctor } });
  };

  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} />
      <h3>{doctor.name}</h3>
      <p>{doctor.specialty}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Location: {doctor.location}</p>
      <button onClick={handleBookNow}>Book Now</button>
    </div>
  );
}

export default DoctorCard;
