// client/src/features/auth/ResetPasswordPage.jsx

import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { apiFetch } from "../../services/api";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await apiFetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMessage("Password reset successful");

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-container">

      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit} className="auth-form">

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button className="primary-btn">Reset Password</button>

      </form>

    </div>
  );
}