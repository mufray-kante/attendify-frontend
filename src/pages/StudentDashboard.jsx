import React from 'react';
import '../styles/dashboard.css';

export default function StudentDashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <h1>Student Dashboard</h1>
      </div>
      <div className='dashboard-cards'>
        <div className='card'><h3>Courses</h3><p>View your enrolled courses and schedule.</p></div>
        <div className='card'><h3>Attendance</h3><p>Check your attendance records and summaries.</p></div>
        <div className='card'><h3>Assignments</h3><p>Submit assignments and track deadlines.</p></div>
        <div className='card'><h3>Profile</h3><p>Update your personal information and password.</p></div>
      </div>
    </div>
  );
}
