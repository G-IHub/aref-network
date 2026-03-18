import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';

export default function AdminLogin() {
  const { login } = useAuth();
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  function handleLogin() {
    const ok = login(pw);
    if (!ok) setError(true);
  }

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo">
          <img src="/Institute-Logo.png" alt="Genomac Institute Logo" />
        </div>
        <div className="login-title">AREF Admin</div>
        <div className="login-sub">Genomac Institute Inc. — Backend</div>
        <input
          type="password"
          className="login-input"
          placeholder="Enter admin password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button className="login-btn" onClick={handleLogin}>Sign In</button>
        {error && <div className="login-err">Incorrect password. Please try again.</div>}
      </div>
    </div>
  );
}
