// client/src/features/learn/components/ScenarioPlayer.jsx

import React, { useState } from "react";
import { useOverlayGuide } from "../../../shared/components/OverlayGuide";
import learnSvg from "../../../assets/illustrations/learn.svg";

// Components
import DialoguePlayer from "./DialoguePlayer";
import ArticulationReveal from "./ArticulationReveal";

export default function ScenarioPlayer({ scenario, onBack }) {
  const [step, setStep] = useState(0);
  const { show } = useOverlayGuide();
  const [showArticulation, setShowArticulation] = useState(false);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false); // 🔥 NEW

  if (!scenario) return null;

  function handleStartConversation() {
    show({
      svg: learnSvg,
      message: "Let's start the learning scenario! Read each step and follow along.",
      key: "learn-modal"
    });
    setStep(2);
  }

  return (
    <div className="scenario-player">

      {/* 🔙 Back */}
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      {/* ========================= */}
      {/* 🔥 STEP 0 — INTRO */}
      {/* ========================= */}
      {step === 0 && (
        <div className="scenario-step">
          <h2>{scenario.title}</h2>
          <p>{scenario.intro}</p>

          <button
            className="primary-btn"
            onClick={() => setStep(1)}
          >
            Next
          </button>
        </div>
      )}

      {/* ========================= */}
      {/* 🔥 STEP 1 — ROLES */}
      {/* ========================= */}
      {step === 1 && (
        <div className="scenario-step">
          <p>
            <strong>Speaker:</strong> {scenario.roles.speaker}
          </p>
          <p>
            <strong>Listener:</strong> {scenario.roles.listener}
          </p>
          <button
            className="primary-btn"
            onClick={handleStartConversation}
          >
            Start Conversation
          </button>
        </div>
      )}

      {/* ========================= */}
      {/* 🔥 STEP 2 — CONVERSATION */}
      {/* ========================= */}
      {step === 2 && (
        <>
          <DialoguePlayer
            dialogue={scenario.conversation}
            onComplete={() => setIsDialogueComplete(true)} // 🔥 KEY FIX
          />

          {/* 🔥 SHOW ONLY AFTER CONVERSATION ENDS */}
          {isDialogueComplete && !showArticulation && (
            <div className="articulation-trigger">
              <button
                className="primary-btn"
                onClick={() => setShowArticulation(true)}
              >
                Wanna know where articulation happens?
              </button>
            </div>
          )}

          {/* 🔥 ARTICULATION */}
          {showArticulation && (
            <ArticulationReveal
              articulation={scenario.articulation}
              conversation={scenario.conversation}
            />
          )}
        </>
      )}
    </div>
  );
}