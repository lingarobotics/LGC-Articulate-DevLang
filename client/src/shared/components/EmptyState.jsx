// client/src/shared/components/EmptyState.jsx

/**
 * EmptyState
 *
 * Displays a placeholder message when no data is available
 * - Used in Evaluate & Doubt modes
 * - Keeps UI from feeling blank or confusing
 */

import React from "react";

export default function EmptyState({
  message = "Nothing to show here yet."
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        📝
      </div>

      <div className="empty-text">
        {message}
      </div>

    </div>
  );
}