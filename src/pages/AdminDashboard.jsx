import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./styles/Dashboard.css";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("lecturer");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for lecturer/student/course
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    let endpoint = "";
    if (activeTab === "lecturer") endpoint = "/api/admin/lecturer";
    if (activeTab === "student") endpoint = "/api/admin/student";
    if (activeTab === "course") endpoint = "/api/admin/course";

    try {
      const res = await axios.post(endpoint, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessage(res.data.message);
      setFormData({});
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="dash-wrapper">
      <Navbar role="admin" />
      <main className="dash-main">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.fullName}!</p>

        {/* Tabs */}
        <div className="dash-tabs">
          {["lecturer", "student", "course"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active-tab" : ""}
              onClick={() => {
                setActiveTab(tab);
                setMessage("");
                setFormData({});
              }}
            >
              {tab === "lecturer"
                ? "Add Lecturer"
                : tab === "student"
                  ? "Add Student"
                  : "Create Course"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="dash-form" onSubmit={handleSubmit}>
          {activeTab === "lecturer" && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Staff Number"
                name="staffNumber"
                value={formData.staffNumber || ""}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
              />
            </>
          )}

          {activeTab === "student" && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Registration Number"
                name="regNumber"
                value={formData.regNumber || ""}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
              />
            </>
          )}

          {activeTab === "course" && (
            <>
              <input
                type="text"
                placeholder="Course Title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
              />
              <textarea
                placeholder="Description (optional)"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit">Submit</button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </main>
    </div>
  );
}