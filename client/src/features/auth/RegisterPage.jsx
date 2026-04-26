// client/src/features/auth/RegisterPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiFetch } from "../../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(form)
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null; // 🔥 prevents crash if HTML/empty response
      }

      if (!res.ok) {
        throw new Error(data?.error || "Signup failed");
      }

      setMessage("Signup successful. Please check your email.");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">

      {/* Glassmorphism Back Button */}
      <button
        className="back-to-home subtle-back-btn"
        type="button"
        onClick={() => navigate("/")}
        tabIndex={0}
        aria-label="Back to Home"
      >
        ← Back to Home
      </button>

      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="auth-form">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="password-field-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="show-hide-btn"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈 Hide" : "👁 Show"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

      </form>

      <p className="auth-switch">
        Existing user?{" "}
        <span onClick={() => navigate("/login")}> 
          Login
        </span>
      </p>

    </div>
  );
}