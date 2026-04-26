// client/src/features/auth/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { apiFetch } from "../../services/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await apiFetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMessage("Password reset link sent to your email");

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-container">

      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit} className="auth-form">

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button className="primary-btn">Send Reset Link</button>

      </form>

    </div>
  );
}