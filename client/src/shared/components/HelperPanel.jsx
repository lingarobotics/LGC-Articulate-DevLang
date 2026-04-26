// client/src/shared/components/HelperPanel.jsx

/**
 * HelperPanel
 *
 * Provides quick guidance tips for better articulation
 * - Appears once (dismissible)
 * - Improves user input quality
 * - Non-intrusive UX
 */

import React, { useState, useEffect } from "react";

const STORAGE_KEY = "lgc_helper_dismissed";

const tips = [
  "Be specific in your response.",
  "Avoid vague words like 'maybe' or 'somehow'.",
  "Include clear actions or reasoning.",
  "Think from both speaker and listener perspectives."
];

export default function HelperPanel() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="helper-panel">

      <div className="helper-header">
        <span>Tips for Better Articulation</span>
        <button
          className="helper-close"
          onClick={dismiss}
          aria-label="Dismiss tips"
        >
          ×
        </button>
      </div>

      <ul className="helper-list">
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>

    </aside>
  );
}