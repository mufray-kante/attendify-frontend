import React from "react";
import "../styles/Dashboard.css"; // ✅ REQUIRED & case-sensitive

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="dash-navbar">
      <div className="dash-logo">Attendify</div>

      <div className="dash-user">
        <span>{user?.fullName || "User"}</span>
        <button
          type="button"
          className="dash-logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
