import React from "react";

import ScoreCard from "./ScoreCard";
import BreakdownCards from "./BreakdownCards";
import UserResponseCard from "../../../shared/components/UserResponseCard";
import AIFeedbackSections from "./AIFeedbackSections";

import { extractHighlights } from "../../../shared/utils/highlight";

// 🔥 SAFE PARSER
function safeNumber(match) {
  return match ? parseInt(match[1]) : null;
}

function parseAI(text) {
  if (!text) return {};

  const score = safeNumber(text.match(/Score:\s*(\d+)/));

  const breakdown = {
    clarity: safeNumber(text.match(/Clarity:\s*(\d+)/)),
    ownership: safeNumber(text.match(/Ownership:\s*(\d+)/)),
    actionability: safeNumber(text.match(/Actionability:\s*(\d+)/)),
    completeness: safeNumber(text.match(/Completeness:\s*(\d+)/)),
    tone: safeNumber(text.match(/Tone:\s*(\d+)/)),
  };

  return { score, breakdown };
}

export default function ResultPanel({ result, userResponse }) {
  // 🔥 HANDLE BOTH BACKEND STRUCTURES (FINAL FIX)
  const feedback =
    result?.aiFeedback ||
    result?.evaluation?.aiFeedback ||
    null;

  const aiText = feedback?.final || "";

  // 🔥 DEBUG (remove later if you want)
  console.log("RESULT PANEL DATA:", result);

  const highlights = extractHighlights(aiText);
  const { score, breakdown } = parseAI(aiText);

  return (
    <div className="result-panel">

      {/* USER RESPONSE */}
      <UserResponseCard
        response={userResponse}
        highlights={highlights}
      />

      {/* SCORE */}
      <ScoreCard score={score} />

      {/* BREAKDOWN */}
      <BreakdownCards breakdown={breakdown} />

      {/* AI FEEDBACK */}
      <AIFeedbackSections finalText={aiText} />

    </div>
  );
}