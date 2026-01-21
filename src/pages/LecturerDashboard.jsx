import React from "react";
import Navbar from "../components/Navbar";

export default function LecturerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="lecturer" />

      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Lecturer Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome, {user?.fullName}!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card scale-hover">My Classes</div>
          <div className="card scale-hover">Attendance Reports</div>
        </div>
      </main>
    </div>
  );
}
