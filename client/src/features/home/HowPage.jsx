// client/src/features/home/HowPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function HowPage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <h2>How This System Works</h2>

      <div className="info-content">

        <p>
          This system is designed to improve articulation through structured thinking — not memorization.
        </p>

        {/* 🔥 CORE IDEA */}
        <div className="mode-block">
          <h3>Core Principle</h3>
          <p>
            Articulation is not about using better words.  
            It is about thinking clearly and expressing that thinking effectively.
          </p>
        </div>

        {/* 🔥 LEARN MODE ROLE */}
        <div className="mode-block">
          <h3>Why Learn Mode Exists</h3>
          <p>
            Before improving articulation, you must first recognize it.
          </p>
          <p>
            Learn Mode exposes you to real conversations and highlights
            where strong and weak articulation occurs.
          </p>
        </div>

        {/* 🔥 EVALUATE MODE ROLE */}
        <div className="mode-block">
          <h3>Why Evaluate Mode Exists</h3>
          <p>
            Observation alone is not enough. You must apply it.
          </p>
          <p>
            Evaluate Mode forces you to think, respond, and reflect on your articulation.
          </p>
        </div>

        {/* 🔥 SYSTEM LOOP */}
        <div className="mode-block">
          <h3>The Learning Loop</h3>
          <ul>
            <li>Observe patterns</li>
            <li>Apply in context</li>
            <li>Refine through feedback</li>
          </ul>

          <p>
            This loop builds articulation as a skill — not a trick.
          </p>
        </div>

      </div>

    </div>
  );
}