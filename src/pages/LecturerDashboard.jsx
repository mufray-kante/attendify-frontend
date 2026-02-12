import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./styles/Dashboard.css";

export default function LecturerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch lecturer's classes
    const fetchClasses = async () => {
      try {
        const res = await axios.get(`/api/lecturer/${user._id}/classes`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setClasses(res.data.classes);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to fetch classes");
      }
    };
    fetchClasses();
  }, [user._id, user.token]);

  return (
    <div className="dash-wrapper">
      <Navbar role="lecturer" />
      <main className="dash-main">
        <h1>Lecturer Dashboard</h1>
        <p>Welcome, {user?.fullName}!</p>

        {message && <p className="form-message">{message}</p>}

        <div className="dash-cards">
          {classes.length ? (
            classes.map((cls) => (
              <div key={cls._id} className="dash-card">
                <h3>{cls.title}</h3>
                <p>{cls.description}</p>
              </div>
            ))
          ) : (
            <p>No classes assigned yet.</p>
          )}
        </div>

        <div className="dash-cards">
          <div className="dash-card">Attendance Reports</div>
        </div>
      </main>
    </div>
  );
}