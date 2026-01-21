import React from "react";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dash-wrapper">
      <Navbar role="student" />
      <main className="dash-main">
        <h1>Student Dashboard</h1>
        <p>Welcome, {user?.fullName}!</p>

        <div className="dash-cards">
          <div className="dash-card">My Attendance</div>
          <div className="dash-card">Course Materials</div>
        </div>
      </main>
    </div>
  );
}
