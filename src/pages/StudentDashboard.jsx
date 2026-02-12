import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./styles/Dashboard.css";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch student courses
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`/api/student/${user._id}/courses`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCourses(res.data.courses);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to fetch courses");
      }
    };
    fetchCourses();
  }, [user._id, user.token]);

  return (
    <div className="dash-wrapper">
      <Navbar role="student" />
      <main className="dash-main">
        <h1>Student Dashboard</h1>
        <p>Welcome, {user?.fullName}!</p>

        {message && <p className="form-message">{message}</p>}

        <div className="dash-cards">
          {courses.length ? (
            courses.map((course) => (
              <div key={course._id} className="dash-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))
          ) : (
            <p>No courses enrolled yet.</p>
          )}
        </div>

        <div className="dash-cards">
          <div className="dash-card">My Attendance</div>
          <div className="dash-card">Course Materials</div>
        </div>
      </main>
    </div>
  );
}