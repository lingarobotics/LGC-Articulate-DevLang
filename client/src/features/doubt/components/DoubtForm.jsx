// client/src/features/doubt/components/DoubtForm.jsx

/**
 * DoubtForm
 *
 * Controlled form for Doubt Mode
 * - Similar to EvaluateForm
 * - Includes "level" (self-assessment)
 * - Focuses on user's current thinking
 */

import React from "react";

export default function DoubtForm({
  input,
  setField,
  onSubmit,
  loading,
  error
}) {
  function handleChange(e) {
    const { name, value } = e.target;
    setField(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="evaluate-form" onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label>Context</label>
        <input
          name="context"
          value={input.context}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Speaker Role</label>
          <input
            name="speakerRole"
            value={input.speakerRole}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label>Listener Role</label>
          <input
            name="listenerRole"
            value={input.listenerRole}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Listener Question</label>
        <input
          name="listenerQuestion"
          value={input.listenerQuestion}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label>Your Current Thinking</label>
        <textarea
          name="userResponse"
          value={input.userResponse}
          onChange={handleChange}
          disabled={loading}
          required
          rows={5}
        />
      </div>

      <div className="form-group">
        <label>Your Self Assessment</label>
        <select
          name="level"
          value={input.level}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="worse">Worse</option>
          <option value="average">Average</option>
          <option value="better">Better</option>
        </select>
      </div>

      {error && <div className="form-error">{error}</div>}

      <button
        type="submit"
        className="primary-btn"
        disabled={loading}
      >
        {loading ? "Consulting AI coach..." : "Ask Doubt"}
      </button>

    </form>
  );
}