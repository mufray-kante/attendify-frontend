import React from 'react';

export default function DashboardSwitcher() {
  const switchTo = (role) => {
    localStorage.setItem('role', role);
    window.location.href = `/${role}/dashboard`; // <-- valid URL string
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
