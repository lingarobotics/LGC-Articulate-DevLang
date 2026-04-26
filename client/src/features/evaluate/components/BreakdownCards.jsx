import React from "react";

export default function BreakdownCards({ breakdown }) {
  // 🔥 SAFETY CHECK
  if (!breakdown || typeof breakdown !== "object") return null;

  const validEntries = Object.entries(breakdown).filter(
    ([_, value]) => value !== null && !isNaN(value)
  );

  // 🔥 OPTIONAL: show message instead of hiding
  if (validEntries.length === 0) {
    return (
      <div className="breakdown-container">
        <p className="breakdown-empty">
          No detailed breakdown available.
        </p>
      </div>
    );
  }

  const getStatus = (value) => {
    if (value >= 15) return "strong";
    if (value >= 10) return "basic";
    return "missing";
  };

  const formatKey = (key) =>
    key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <div className="breakdown-container">
      {validEntries.map(([key, value]) => (
        <div
          key={key}
          className={`breakdown-card ${getStatus(value)}`}
        >
          <div className="breakdown-rule">
            {formatKey(key)}
          </div>

          <div className="breakdown-status">
            {value}/20
          </div>
        </div>
      ))}
    </div>
  );
}