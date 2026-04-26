// client/src/shared/components/UserResponseCard.jsx

/**
 * UserResponseCard
 *
 * Displays the user's response with highlighted phrases
 * - Uses HighlightedText for intelligent highlighting
 * - Shared across Evaluate & Doubt modes
 * - Keeps UI consistent for user input display
 */

import React from "react";
import HighlightedText from "./HighlightedText";

export default function UserResponseCard({ response, highlights = [] }) {
  if (!response) return null;

  return (
    <div className="response-card">
      
      <div className="response-title">
        Your Response
      </div>

      <div className="response-content">
        <HighlightedText text={response} highlights={highlights} />
      </div>

    </div>
  );
}