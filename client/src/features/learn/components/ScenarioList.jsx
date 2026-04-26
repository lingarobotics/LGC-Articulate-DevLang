// client/src/features/learn/components/ScenarioList.jsx

import React from "react";

export default function ScenarioList({ scenarios, onSelect }) {
  if (!scenarios || !scenarios.length) {
    return (
      <div className="empty-state">
        No scenarios available.
      </div>
    );
  }

  return (
    <div className="scenario-list">

      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          className="scenario-card"
          onClick={() => onSelect(scenario)}
        >
          <div className="scenario-title">
            {scenario.title}
          </div>

          {/* 🔥 FIX: use intro instead of context */}
          <div className="scenario-preview">
            {scenario.intro}
          </div>

          {/* 🔥 OPTIONAL (nice UX): roles preview */}
          <div className="scenario-roles">
            <small>
              {scenario.roles.speaker} → {scenario.roles.listener}
            </small>
          </div>

        </div>
      ))}

    </div>
  );
}