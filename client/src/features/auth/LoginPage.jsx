// client/src/features/auth/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setToken } from "../../utils/auth";
import { apiFetch } from "../../services/api";

export default function LoginPage() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // 🔥 SAVE TOKEN
      setToken(data.token);

      // 🔥 VISUAL MOMENT ONLY
      sessionStorage.setItem("lgc-auth-success", "1");

      // 🔥 RESET FORM (clean UX)
      setForm({ email: "", password: "" });

      // 🔥 REDIRECT
      navigate("/learn");

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

      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="password-field-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
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

        {/* 🔥 ERROR */}
        {error && <p className="error">{error}</p>}

        {/* 🔥 BUTTON */}
        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔥 FORGOT PASSWORD */}
        <p
          className="auth-forgot"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </p>

      </form>

      {/* 🔥 SWITCH */}
      <p className="auth-switch">
        New user?
        <span onClick={() => navigate("/register")}> 
          Register
        </span>
      </p>

    </div>
  );
}