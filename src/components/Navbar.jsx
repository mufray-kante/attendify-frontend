import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <div className="dash-navbar">
      <div className="dash-logo">Attendify</div>
      <div className="dash-user">
        <span>{user?.fullName}</span>
        <button className="dash-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
