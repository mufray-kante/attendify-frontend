import React from 'react';
import '../styles/dashboard.css';

export default function LecturerDashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <h1>Lecturer Dashboard</h1>
      </div>
      <div className='dashboard-cards'>
        <div className='card'><h3>My Courses</h3><p>View and manage courses you are teaching.</p></div>
        <div className='card'><h3>Attendance</h3><p>Mark and review student attendance.</p></div>
        <div className='card'><h3>Assignments</h3><p>Create, edit, and review student assignments.</p></div>
        <div className='card'><h3>Profile</h3><p>Update your profile and contact information.</p></div>
      </div>
    </div>
  );
}
