import React from "react";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="admin" />

      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome, {user?.fullName}!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card scale-hover">Manage Users</div>
          <div className="card scale-hover">Attendance Sessions</div>
          <div className="card scale-hover">Reports</div>
        </div>
      </main>
    </div>
  );
}
