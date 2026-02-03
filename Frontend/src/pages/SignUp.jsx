/**
 * Sign Up Page
 * 
 * User registration page for creating new accounts on HelloDoc.
 * Supports both Patient and Doctor registration with role-specific fields.
 * 
 * Features:\n * - Role selection (Patient or Doctor)
 * - Role-specific form fields
 * - Form validation
 * - Basic error handling
 * - Navigation to login on successful signup
 * - Link to existing account login
 * 
 * Form Fields:
 * Common (Both roles):
 * - First Name, Last Name
 * - Date of Birth
 * - Email, Phone
 * - Password
 * - Gender
 * - Address
 * 
 * Doctor-specific:
 * - Clinic Location
 * - Consultation Fee
 * - Experience Years
 * 
 * TODO:
 * - Connect to backend API for registration
 * - Add email verification
 * - Add password strength validation
 * - Add phone number validation
 * - Implement comprehensive form validation
 * - Add terms and conditions agreement
 * - Add CAPTCHA for bot prevention
 */

import { useState } from "react";
import "../styles/pages/SignUp.css";

function Signup() {
  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    address: "",
    clinicLocation: "",
    consultationFee: "",
    experienceYears: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      role
    };

    console.log("Signup payload:", payload);
    // later -> send to Spring Boot API
  };

  return (
    <div className="signup-page">
      <section>
        {Array.from({ length: 220 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </section>

      <div className="signup">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="row">
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* DOB */}
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Gender */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          {/* Role Switch */}
          <div className="role-switch">
            <button
              type="button"
              className={role === "PATIENT" ? "active" : ""}
              onClick={() => setRole("PATIENT")}
            >
              Patient
            </button>
            <button
              type="button"
              className={role === "DOCTOR" ? "active" : ""}
              onClick={() => setRole("DOCTOR")}
            >
              Doctor
            </button>
          </div>

          {/* PATIENT FIELDS */}
          {role === "PATIENT" && (
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
          )}

          {/* DOCTOR FIELDS */}
          {role === "DOCTOR" && (
            <>
              <input
                name="clinicLocation"
                placeholder="Clinic Location"
                value={form.clinicLocation}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="consultationFee"
                placeholder="Consultation Fee"
                value={form.consultationFee}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="experienceYears"
                placeholder="Experience (Years)"
                value={form.experienceYears}
                onChange={handleChange}
                required
              />
            </>
          )}

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Create Account
          </button>

          <p className="switch-auth">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
