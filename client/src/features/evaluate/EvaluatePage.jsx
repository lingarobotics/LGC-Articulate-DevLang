// client/src/features/evaluate/EvaluatePage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useEvaluateFlow from "./state/useEvaluateFlow";
import ResultPanel from "./components/ResultPanel";
import EmptyState from "../../shared/components/EmptyState";
import { scenarios } from "./data/scenarios.js";

// 🔥 MODE SWITCH
import ModeSwitchPanel from "../../shared/components/ModeSwitchPanel";

// 🔥 AUTH + USAGE
import { getToken } from "../../utils/auth";
import {
  getUsageCount,
  incrementUsage
} from "../../utils/usageTracker";

export default function EvaluatePage() {
  const navigate = useNavigate();

  const {
    input,
    setField,
    submit,
    loading,
    error,
    result,
    setScenario
  } = useEvaluateFlow();

  const [selectedScenario, setSelectedScenario] = useState(null);

  useEffect(() => {
    if (selectedScenario) {
      setScenario(selectedScenario);
    }
  }, [selectedScenario]);

  // =========================
  // 🔥 CONTROLLED SUBMIT
  // =========================
  async function handleSubmit() {
    const token = getToken();
    const usage = getUsageCount();

    if (!token && usage >= 3) {
      navigate("/login");
      return;
    }

    await submit();

    if (!token) {
      incrementUsage();
    }
  }

  return (
    <div className="evaluate-page">

      {/* 🔥 TOP ACTION BAR */}
      <div className="evaluate-topbar">
        <h2>Evaluate</h2>

        <button
          className="primary-btn history-link-btn"
          onClick={() => navigate("/history")}
        >
          View History →
        </button>
      </div>

      {/* ========================= */}
      {/* 🔥 SCENARIO SELECTION */}
      {/* ========================= */}
      {!selectedScenario && (
        <>
          <div className="scenario-list">
            <h2>Select a Scenario</h2>

            <div className="scenario-grid">
              {scenarios.map((sc) => (
                <div
                  key={sc.id}
                  className="scenario-card"
                  onClick={() => setSelectedScenario(sc)}
                >
                  <h3>{sc.title}</h3>
                  <p>{sc.listenerRole} asks a question</p>
                </div>
              ))}
            </div>
          </div>

          <ModeSwitchPanel />
        </>
      )}

      {/* ========================= */}
      {/* 🔥 SCENARIO VIEW */}
      {/* ========================= */}
      {selectedScenario && (
        <div className="scenario-container">

          {/* ROLE */}
          <div className="scenario-role">
            You are a <strong>{selectedScenario.speakerRole}</strong> speaking to{" "}
            <strong>{selectedScenario.listenerRole}</strong>
          </div>

          {/* CONVERSATION */}
          <div className="scenario-context">
            {selectedScenario.context.map((line, index) => (
              <div key={index} className="chat-line">
                <span className="speaker">{line.speaker}:</span>
                <span className="text"> {line.text}</span>
              </div>
            ))}
          </div>

          {/* QUESTION */}
          <div className="scenario-question">
            {selectedScenario.listenerRole}:{" "}
            <strong>{selectedScenario.listenerQuestion}</strong>
          </div>

          {/* INPUT */}
          <div className="response-box">
            <textarea
              placeholder="Write your response..."
              value={input.userResponse}
              onChange={(e) =>
                setField("userResponse", e.target.value)
              }
            />

            <button
              className="primary-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Evaluating..." : "Submit Response"}
            </button>
          </div>

          {/* ERROR */}
          {error && <p className="error">{error}</p>}

          {/* RESULT */}
          <div className="result-section">
            {!result && !loading && !error && (
              <EmptyState message="Your evaluation will appear here." />
            )}

            {result && (
              <>
                <ResultPanel
                  result={result}
                  userResponse={input.userResponse}
                />

                <ModeSwitchPanel />
              </>
            )}
          </div>

          {/* BACK */}
          <button
            className="back-btn"
            onClick={() => setSelectedScenario(null)}
          >
            ← Change Scenario
          </button>

        </div>
      )}
    </div>
  );
}