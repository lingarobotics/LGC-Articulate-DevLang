// client/src/features/learn/components/ArticulationReveal.jsx

import React, { useState } from "react";

export default function ArticulationReveal({ articulation, conversation }) {
  const [index, setIndex] = useState(0);

  if (!articulation || articulation.length === 0) return null;

  const point = articulation[index];
  const isLast = index === articulation.length - 1;

  // 🔥 derive speaker from conversation using lineIndex
  const speaker = conversation?.[point.lineIndex]?.speaker;

  return (
    <div className="articulation-container">

      <div className="articulation-title">
        Where the articulation happens
      </div>

      {/* 🔥 LEVEL BADGE */}
      <div className={`articulation-level ${point.level}`}>
        {point.level}
      </div>

      {/* 🔥 ORIGINAL */}
      <div className="art-block">
        <strong>
          Original ({speaker})
        </strong>
        <p>{point.original}</p>
      </div>

      {/* 🔥 ANALYSIS */}
      <div className="art-block">
        <strong>Why it matters</strong>
        <p>{point.analysis}</p>
      </div>

      {/* 🔥 IMPROVED */}
      <div className="art-block">
        <strong>Better articulation</strong>
        <p>{point.improved}</p>
      </div>

      {/* 🔥 CONTROLS */}
      <div className="art-controls">

        {index > 0 && (
          <button
            className="primary-btn"
            onClick={() => setIndex((prev) => prev - 1)}
          >
            ← Back
          </button>
        )}

        {!isLast ? (
          <button
            className="primary-btn"
            onClick={() => setIndex((prev) => prev + 1)}
          >
            Next Insight →
          </button>
        ) : (
          <div className="art-end">
            End of articulation insights
          </div>
        )}

      </div>

    </div>
  );
}