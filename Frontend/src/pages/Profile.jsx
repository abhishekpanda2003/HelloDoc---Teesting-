/**
 * User Profile Page
 * 
 * Displays patient profile information and basic account details.
 * 
 * Current Features:
 * - Display profile picture
 * - Show basic user information (name, email, role, member since)
 * 
 * TODO: Implement the following features:
 * - Edit profile information
 * - Change profile picture
 * - Update personal details
 * - Medical history
 * - Emergency contacts
 * - Insurance information
 * - Preferred doctors list
 * - Connect to backend API for user data
 */

function Profile() {
  return (
    <div>

      <div style={{ marginTop: "20px" }}>
        <img
          src="https://i.pravatar.cc/150"
          alt="User"
          style={{ borderRadius: "50%" }}
        />

        <h2>John Patient</h2>
        <p>Email: john@email.com</p>
        <p>Role: Patient</p>
        <p>Member since: 2024</p>
      </div>
    </div>
  );
}

export default Profile;
