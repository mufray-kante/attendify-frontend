import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // CSS for dashboard styling

export default function Navbar({ role }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="dash-navbar">
      <div className="dash-logo">
        Attendify {role?.charAt(0).toUpperCase() + role?.slice(1)}
      </div>
      <div className="dash-user">
        <span>{user?.fullName}</span>
        <button className="dash-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
