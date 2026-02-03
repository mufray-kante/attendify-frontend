import React, { useState } from 'react';
import { loginAndGenerateQR } from '../utils/loginQR';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginAndGenerateQR(email, password);
    setMessage(result.message);
    if (result.success) {
      setQrUrl(result.qrCodeUrl);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Login</h1>
      {message && <div style={{ color: 'red', marginBottom: '10px' }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type='submit' style={{ width: '100%', padding: '10px' }}>Login</button>
      </form>
      {qrUrl && <img src={qrUrl} alt='User QR code' style={{ marginTop: '20px', maxWidth: '200px' }} />}
    </div>
  );
}
