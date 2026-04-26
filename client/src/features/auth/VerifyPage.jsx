import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { apiFetch } from "../../services/api";

export default function VerifyPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  // 🔥 PREVENT DOUBLE EXECUTION (CRITICAL FIX)
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const rawToken = params.get("token");

    if (!rawToken) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const token = decodeURIComponent(rawToken);

    async function verify() {
      try {
        const res = await apiFetch(`/api/auth/verify?token=${token}`);

        let data;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (!res.ok) {
          throw new Error(data?.error || "Verification failed");
        }

        setStatus("success");
        setMessage(data?.message || "Email verified successfully");

      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    }

    verify();
  }, [params]);

  // 🔥 RESEND HANDLER
  async function handleResend() {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const res = await apiFetch("/api/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email })
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        if (data?.error === "User already verified") {
          setStatus("success");
          setMessage("Email already verified. You can login.");
          return;
        }

        throw new Error(data?.error || "Failed to resend");
      }

      alert("Verification email sent again!");

    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="auth-container">
      <h2>Email Verification</h2>

      {status === "verifying" && <p>Verifying...</p>}

      {status === "success" && (
        <>
          <p className="success">{message}</p>
          <button className="primary-btn" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <p className="error">{message}</p>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="primary-btn" onClick={handleResend}>
            Resend Verification Email
          </button>
        </>
      )}
    </div>
  );
}