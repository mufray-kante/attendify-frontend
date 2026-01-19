import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ allowedRole, children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRole && role !== allowedRole) {
    // redirect user to their dashboard if role mismatched
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'lecturer') return <Navigate to="/lecturer/dashboard" replace />;
    if (role === 'student') return <Navigate to="/student/dashboard" replace />;

    // fallback to login if role missing
    return <Navigate to="/login" replace />;
  }

  return children;
}
