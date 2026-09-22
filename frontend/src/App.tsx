import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Login failed");
        return;
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      alert("Login successful!");

      console.log("JWT Token:", data.access_token);
    } catch (error) {
      console.error(error);
      setError(
        "Unable to connect to the server."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="logo">EMS</div>

          <h1>Employee Management System</h1>

          <p>Admin Login</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>

        </form>

        <div className="login-footer">
          <p>
            Secure Employee Data Management
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;