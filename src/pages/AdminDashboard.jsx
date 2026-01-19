import React from 'react';
import DashboardSwitcher from '../components/DashboardSwitcher';
import '../styles/dashboard.css';

export default function AdminDashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <h1>Admin Dashboard</h1>
        <DashboardSwitcher />
      </div>
      <div className='dashboard-cards'>
        <div className='card'><h3>Users</h3><p>Manage all students, lecturers, and admins.</p></div>
        <div className='card'><h3>Attendance</h3><p>View and approve attendance submissions.</p></div>
        <div className='card'><h3>Reports</h3><p>Generate analytics and export reports.</p></div>
        <div className='card'><h3>Settings</h3><p>Configure system settings and permissions.</p></div>
      </div>
    </div>
  );
}
