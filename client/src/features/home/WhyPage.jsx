// client/src/features/home/WhyPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function WhyPage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* 🔙 Back */}
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      {/* 🔥 TITLE */}
      <h2>Why Articulation Matters</h2>

      {/* 🔥 CONTENT */}
      <div className="info-content">

        <p>
          Knowing something is not enough.  
          If you can’t express it clearly, it has no impact.
        </p>

        <p>
          In real-world situations, people are judged not just by what they know,
          but by how clearly and confidently they communicate it.
        </p>

        <p>
          Poor articulation leads to:
        </p>

        <ul>
          <li>Misunderstood ideas</li>
          <li>Weak decision-making influence</li>
          <li>Missed opportunities</li>
        </ul>

        <p>
          Strong articulation helps you:
        </p>

        <ul>
          <li>Communicate with clarity</li>
          <li>Show confidence and ownership</li>
          <li>Influence decisions effectively</li>
        </ul>

        <p>
          This system is designed to help you build that skill — step by step.
        </p>

      </div>

    </div>
  );
}