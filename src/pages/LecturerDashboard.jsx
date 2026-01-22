import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css"; // ✅ correct place

export default function LecturerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dash-wrapper">
      <Navbar role="lecturer" />
      <main className="dash-main">
        <h1>Lecturer Dashboard</h1>
        <p>Welcome, {user?.fullName}!</p>

        <div className="dash-cards">
          <div className="dash-card">My Classes</div>
          <div className="dash-card">Attendance Reports</div>
        </div>
      </main>
    </div>
  );
}
