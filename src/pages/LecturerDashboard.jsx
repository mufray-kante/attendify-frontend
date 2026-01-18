import { useState } from 'react';
import { api, setToken } from '../services/api';

export default function LecturerDashboard() {
  const [session, setSession] = useState(null);
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

  const startSession = async () => {
    try {
      const res = await api.post('/attendance/start', {
        courseId: 'DEMO_COURSE_ID',
        durationMinutes: 5
      });
      setSession(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to start session: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lecturer Dashboard</h2>

      {!loggedIn && (
        <div>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>{msg}</p>
        </div>
      )}

      {loggedIn && !session && (
        <button onClick={startSession}>Start Attendance</button>
      )}

      {session && (
        <div>
          <p><b>Token:</b> {session.token}</p>
          <p><b>Expires:</b> {new Date(session.expiresAt).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
}
