import { useState } from 'react';

export default function Register() {
  // State for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    // Here you can perform authentication logic
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        console.log('Registration successful');
        setError(false);
        window.location.href = '/';
      } else {
        console.error('Registration failed');
        setError(true)
      }
    } catch (error) {
      console.error('Error:', error);
      setError(true)
    }

    console.log('Submitted:', { username, password });
  };

  return (
    <div className="register page">
      <h1>Register Page</h1>
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
        <button type="submit">Register</button>
      </form>
      {error && (
        <p>Error registering</p>
      )}
      <a href='/login'>Already have an account? Log in</a>
    </div>
  );
}