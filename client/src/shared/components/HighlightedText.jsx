// client/src/shared/components/HighlightedText.jsx

/**
 * HighlightedText
 *
 * Renders text with highlighted phrases based on AI feedback
 * - Uses shared highlight utility (no duplicate logic)
 * - Handles overlapping ranges safely
 * - Fully reusable across Evaluate & Doubt modes
 */

import React from "react";
import { getHighlightRanges } from "../utils/highlight";

export default function HighlightedText({ text, highlights = [] }) {
  if (!text) return null;

  const ranges = getHighlightRanges(text, highlights);

  if (!ranges.length) {
    return <span>{text}</span>;
  }

  const elements = [];
  let lastIndex = 0;

  ranges.forEach((range, i) => {
    const { start, end } = range;

    // Normal text before highlight
    if (start > lastIndex) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {text.slice(lastIndex, start)}
        </span>
      );
    }

    // Highlighted text
    elements.push(
      <span
        key={`highlight-${start}-${i}`}
        className="highlight"
      >
        {text.slice(start, end)}
      </span>
    );

    lastIndex = end;
  });

  // Remaining text
  if (lastIndex < text.length) {
    elements.push(
      <span key={`text-${lastIndex}`}>
        {text.slice(lastIndex)}
      </span>
    );
  }

  return <>{elements}</>;
}