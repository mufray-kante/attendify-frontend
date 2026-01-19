import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ allowedRole, children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to='/login' replace />;

  // Redirect to user's dashboard if role doesn't match allowedRole
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return children;
}
