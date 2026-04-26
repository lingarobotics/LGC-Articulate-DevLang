// client/src/features/home/ContactPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="docs-container">

      {/* 🔙 Back */}
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <h2>Contact</h2>

      <div className="info-content">

        {/* 🔥 INTRO */}
        <p>
          Feel free to reach out for any issues, collaboration opportunities,
          or contributions to the project.
        </p>

        {/* 🔥 EMAIL */}
        <div className="mode-block">
          <h3>Email</h3>
          <p>lingarobotics@gmail.com</p>
          <p>lgcsystemsadmin@gmail.com</p>
        </div>

        {/* 🔥 GITHUB */}
        <div className="mode-block">
          <h3>GitHub</h3>
          <a
            href="https://github.com/lingarobotics"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/lingarobotics
          </a>
        </div>

        {/* 🔥 LINKEDIN */}
        <div className="mode-block">
          <h3>LinkedIn</h3>
          <a
            href="https://www.linkedin.com/in/linga-robotics-conceptual-learner"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.linkedin.com/in/linga-robotics-conceptual-learner
          </a>
        </div>

        {/* 🔥 PURPOSE */}
        <div className="mode-block">
          <h3>Why Contact</h3>
          <ul>
            <li>Facing issues while using the platform</li>
            <li>Interested in collaboration</li>
            <li>Want to contribute to the open-source project</li>
          </ul>
        </div>

      </div>

    </div>
  );
}