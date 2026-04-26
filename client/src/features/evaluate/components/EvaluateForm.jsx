// client/src/features/evaluate/components/EvaluateForm.jsx

/**
 * EvaluateForm
 *
 * Response-only input for Evaluation Mode
 * - Scenario is predefined (NOT editable)
 * - User only submits response
 */

import React from "react";

export default function EvaluateForm({
  input,
  setField,
  onSubmit,
  loading,
  error
}) {
  function handleChange(e) {
    setField("userResponse", e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="evaluate-form" onSubmit={handleSubmit}>

      {/* 🔥 ONLY USER RESPONSE */}
      <div className="form-group">
        <label>Your Response</label>
        <textarea
          name="userResponse"
          value={input.userResponse}
          onChange={handleChange}
          disabled={loading}
          required
          rows={5}
          placeholder="Respond as per the situation..."
        />
      </div>

      {/* ERROR */}
      {error && <div className="form-error">{error}</div>}

      {/* SUBMIT */}
      <button
        type="submit"
        className="primary-btn"
        disabled={loading}
      >
        {loading ? "Evaluating..." : "Submit Response"}
      </button>

    </form>
  );
}