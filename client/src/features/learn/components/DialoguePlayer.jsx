// client/src/features/learn/components/DialoguePlayer.jsx

import React, { useState } from "react";

export default function DialoguePlayer({ dialogue, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!dialogue || !dialogue.length) return null;

  const isLast = currentIndex === dialogue.length - 1;

  // 🔥 Identify speaker baseline (first speaker)
  const mainSpeaker = dialogue[0].speaker;

  function handleNext() {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 🔥 Notify parent that conversation is complete
      onComplete && onComplete();
    }
  }

  return (
    <div className="dialogue-player">

      {/* 🔥 FULL CONVERSATION BUILD-UP */}
      <div className="dialogue-box">
        {dialogue.slice(0, currentIndex + 1).map((line, index) => (
          <div
            key={index}
            className={`dialogue-line ${
              line.speaker === mainSpeaker
                ? "is-speaker"
                : "is-listener"
            }`}
          >
            <div className="dialogue-speaker">
              {line.speaker}
            </div>

            <div className="dialogue-text">
              {line.text}
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 CONTROLS */}
      <div className="dialogue-controls">

        <button className="primary-btn" onClick={handleNext}>
          {isLast ? "Finish" : "Next"}
        </button>

      </div>

    </div>
  );
}