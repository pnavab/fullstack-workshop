import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
  // State for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted:', { username, password });
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        console.log('Login successful');
        setError(false);
        window.location.href = '/';
      } else {
        console.error('Login failed');
        setError(true)
      }

    } catch (error) {
      console.error('Login error:', error);
      setError(true);
    }
  };

  return (
    <div className="login page">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && (
        <p>Error logging in</p>
      )}
      <div>
        <a href='/register'>No account? Register here</a>
      </div>
    </div>
  );
}