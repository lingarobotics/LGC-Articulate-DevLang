// client/src/features/learn/LearnPage.jsx

import React, { useState } from "react";

// 🔥 DATA
import { learnScenarios } from "./data/learnScenarios";

// COMPONENTS
import ScenarioList from "./components/ScenarioList";
import ScenarioPlayer from "./components/ScenarioPlayer";

// 🔥 MODE SWITCH
import ModeSwitchPanel from "../../shared/components/ModeSwitchPanel";

export default function LearnPage() {
  const [selectedScenario, setSelectedScenario] = useState(null);

  function handleSelect(scenario) {
    setSelectedScenario(scenario);
  }

  function handleBack() {
    setSelectedScenario(null);
  }

  return (
    <div className="learn-page">
      {/* 🔥 Mode switch always visible and sticky */}
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, paddingBottom: 8 }}>
        <ModeSwitchPanel />
      </div>
      {!selectedScenario ? (
        <ScenarioList
          scenarios={learnScenarios}
          onSelect={handleSelect}
        />
      ) : (
        <ScenarioPlayer
          scenario={selectedScenario}
          onBack={handleBack}
        />
      )}
    </div>
  );
}