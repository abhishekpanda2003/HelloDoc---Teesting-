/**
 * Sign In Page
 * 
 * Authentication page for users to log into the HelloDoc application.
 * 
 * Features:
 * - Username and password input fields
 * - Form validation
 * - Error message display
 * - Session ID generation on successful login
 * - Navigation to dashboard on successful login
 * - Link to sign up page
 * - Animated background with particle effect
 * 
 * Credentials (Mock):
 * - Username: admin (Patient)
 * - Password: admin123
 * - Username: doctor (Doctor)
 * - Password: doctor123
 * 
 * TODO: 
 * - Replace hardcoded credentials with backend API authentication
 * - Add "Remember Me" functionality
 * - Add "Forgot Password" link
 * - Add OAuth login options (Google, GitHub, etc.)
 * - Add proper error handling and logging
 * - Add rate limiting for failed attempts
 * - Store auth token in secure storage
 */

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages/SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Hardcoded credentials with role assignment
    const validCredentials = {
      admin: { password: "admin123", role: "PATIENT", name: "John Patient" },
      doctor: { password: "doctor123", role: "DOCTOR", name: "Dr. Sarah Williams" },
    };

    if (validCredentials[username] && validCredentials[username].password === password) {
      // Create session and user data
      const userData = {
        id: Math.random(),
        name: validCredentials[username].name,
        email: `${username}@hellodoc.com`,
        role: validCredentials[username].role,
        loginTime: new Date().toISOString(),
      };

      // Login with auth context (creates session)
      const sessionId = login(userData, validCredentials[username].role);

      console.log(`✅ Login successful - SessionID: ${sessionId}`);
      setError("");
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate("/dashboard");
        setIsLoading(false);
      }, 500);
    } else {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <section>
        {Array.from({ length: 220 }).map((_, index) => (
          <span key={index}></span>
        ))}

        <div className="signin">
          <div className="signin-content">
            <h2>Sign In</h2>

            <form className="form" onSubmit={handleLogin}>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {error}
                </p>
              )}

              <div className="links">
                <a href="#">Forgot Password</a>
                <NavLink to="/signup">Signup</NavLink>
              </div>

              <div className="inputBox">
                <input 
                  type="submit" 
                  value={isLoading ? "Signing In..." : "Login"}
                  disabled={isLoading}
                />
              </div>
            </form>

            {/* Demo Credentials Info */}
            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                backgroundColor: "rgba(10, 163, 181, 0.1)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#0f172a",
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
                📋 Demo Credentials:
              </p>
              <p style={{ margin: "4px 0" }}>
                👤 Patient: <strong>admin</strong> / <strong>admin123</strong>
              </p>
              <p style={{ margin: "4px 0" }}>
                👨‍⚕️ Doctor: <strong>doctor</strong> / <strong>doctor123</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
