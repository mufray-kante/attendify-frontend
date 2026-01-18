import { useState } from 'react';
import { api, setToken } from '../services/api';

export default function StudentAttendance() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      setLoggedIn(true);
      setMsg('Login successful!');
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  const markAttendance = async () => {
    try {
      const sessionRes = await api.get('/attendance/current');
      const token = sessionRes.data.token;

      const res = await api.post('/attendance/mark', { token });
      setMsg(res.data.message);
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || 'Failed to mark attendance');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Attendance</h2>

      {!loggedIn && (
        <div>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>{msg}</p>
        </div>
      )}

      {loggedIn && (
        <div>
          <button onClick={markAttendance}>Mark Attendance</button>
          <p>{msg}</p>
        </div>
      )}
    </div>
  );
}
