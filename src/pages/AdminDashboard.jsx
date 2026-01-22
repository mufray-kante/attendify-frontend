import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css"; // ✅ correct place
export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dash-wrapper">
      <Navbar role="admin" />
      <main className="dash-main">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.fullName}!</p>

        <div className="dash-cards">
          <div className="dash-card">Manage Users</div>
          <div className="dash-card">Attendance Sessions</div>
          <div className="dash-card">Reports</div>
        </div>
      </main>
    </div>
  );
}
