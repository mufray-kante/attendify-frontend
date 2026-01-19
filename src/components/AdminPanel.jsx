import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

export default function AdminPanel() {
  const [pin, setPin] = useState('');
  const [courseId, setCourseId] = useState('');
  const [duration, setDuration] = useState(10);

  const createSession = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'https://attendify-backend-production-cdb4.up.railway.app/api/v1/attendance-sessions/start',
        { courseId, durationMinutes: duration },
        { headers: { Authorization: Bearer  } }
      );
      setPin(res.data.pin);
    } catch (err) {
      console.error(err);
      alert('Failed to create session');
    }
  };

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Admin Panel</h2>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Course ID'
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className='border px-3 py-2 rounded-lg mr-2'
        />
        <input
          type='number'
          placeholder='Duration (minutes)'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className='border px-3 py-2 rounded-lg mr-2 w-32'
        />
        <button onClick={createSession} className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
          Generate QR Code
        </button>
      </div>
      {pin && (
        <div className='mt-4'>
          <h3 className='mb-2'>Session PIN / QR Code</h3>
          <QRCodeCanvas value={pin} size={150} />
          <p className='mt-2'>{pin}</p>
        </div>
      )}
    </div>
  );
}
