import React from "react";

export default function ScoreCard({ score }) {
  if (score === undefined || score === null) return null;

  let level = "";
  let status = "";

  if (score >= 90) {
    level = "Excellent";
    status = "success";
  } else if (score >= 70) {
    level = "Good";
    status = "success";
  } else if (score >= 50) {
    level = "Average";
    status = "warning";
  } else {
    level = "Needs Improvement";
    status = "error";
  }

  return (
    <div className={`score-card ${status}`}>

      <div className="score-label">
        Overall Score
      </div>

      <div className="score-value">
        {score}/100
      </div>

      <div className="score-level">
        {level}
      </div>

    </div>
  );
}