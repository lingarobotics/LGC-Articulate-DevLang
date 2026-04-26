// client/src/features/home/DocsPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function DocsPage() {
  const navigate = useNavigate();

  return (
    <div className="docs-container">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <h2>How to Use This Platform</h2>

      <p className="docs-subtitle">
        Follow these steps to use the platform effectively.
      </p>

      <div className="info-content">

        {/* 🔥 LEARN MODE */}
        <div className="mode-block">
          <h3>Using Learn Mode</h3>
          <ol>
            <li>Select a scenario</li>
            <li>Read the introduction</li>
            <li>Understand roles</li>
            <li>Go through conversation step-by-step</li>
            <li>Click "Finish" after completion</li>
            <li>Review articulation insights</li>
          </ol>
        </div>

        {/* 🔥 EVALUATE MODE */}
        <div className="mode-block">
          <h3>Using Evaluate Mode</h3>
          <ol>
            <li>Select a scenario</li>
            <li>Read the conversation context</li>
            <li>Write your response</li>
            <li>Submit for evaluation</li>
            <li>Analyze feedback and improve</li>
          </ol>
        </div>

        {/* 🔥 NAVIGATION */}
        <div className="mode-block">
          <h3>Navigation</h3>
          <ul>
            <li>Use the top bar to switch between sections</li>
            <li>Return to Home anytime</li>
            <li>Switch between Learn and Evaluate modes freely</li>
          </ul>
        </div>

      </div>

    </div>
  );
}