import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardSwitcher() {
  const navigate = useNavigate();

  const switchTo = (role) => {
    localStorage.setItem('role', role);

    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'lecturer') navigate('/lecturer/dashboard');
    else if (role === 'student') navigate('/student/dashboard');
  };

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        onClick={() => switchTo('admin')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#2563EB',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Admin
      </button>
      <button
        onClick={() => switchTo('lecturer')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#9333EA',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Lecturer
      </button>
      <button
        onClick={() => switchTo('student')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#14B8A6',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Student
      </button>
    </div>
  );
}
