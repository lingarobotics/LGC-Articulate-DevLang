// client/src/features/evaluate/components/FeedbackList.jsx

/**
 * FeedbackList
 *
 * Displays actionable feedback points from evaluation
 * - Clear, concise improvement suggestions
 * - Keeps feedback structured and readable
 */

import React from "react";

export default function FeedbackList({ feedback }) {
  if (!feedback || !feedback.length) return null;

  return (
    <div className="feedback-card">
      
      <div className="feedback-title">
        Feedback
      </div>

      <ul className="feedback-list">
        {feedback.map((item, index) => (
          <li key={index} className="feedback-item">
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
}