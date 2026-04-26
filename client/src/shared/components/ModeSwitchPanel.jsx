// client/src/shared/components/ModeSwitchPanel.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const modes = [
  { label: "Learn", path: "/learn" },
  { label: "Evaluate", path: "/evaluate" },
  { label: "Doubt", path: "/doubt" }
];

export default function ModeSwitchPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="mode-switch-panel reveal">
      {/* 🔙 HOME */}
      <button
        className="secondary-btn"
        onClick={() => navigate("/")}
      >
        ← Home
      </button>
      {/* 🔄 ALL MODES REVEAL */}
      <div className="mode-buttons">
        {modes.map((mode) => (
          <button
            key={mode.path}
            className={`primary-btn mode-btn${currentPath === mode.path ? ' active' : ''}`}
            onClick={() => navigate(mode.path)}
            disabled={currentPath === mode.path}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}