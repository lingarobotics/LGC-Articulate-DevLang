import React, { useState } from "react";
import HighlightedText from "../../../shared/components/HighlightedText";
import { extractHighlights } from "../../../shared/utils/highlight";

/**
 * 🔥 Remove Score + Breakdown before parsing sections
 */
function cleanAIText(text) {
  if (!text) return "";

  let cleaned = text.replace(/Score:\s*\d+\/100/i, "");

  cleaned = cleaned.replace(/Breakdown:[\s\S]*?(?=Strength:|$)/i, "");

  return cleaned.trim();
}

/**
 * 🔥 Parse AI feedback into sections (robust)
 */
function parseSections(text) {
  const sections = {
    Strength: "",
    Gap: "",
    Improve: ""
  };

  if (!text) return sections;

  let current = null;

  text.split("\n").forEach((line) => {
    const trimmed = line.trim();

    if (/^Strength:/i.test(trimmed)) {
      current = "Strength";
      return;
    }

    if (/^Gap:/i.test(trimmed)) {
      current = "Gap";
      return;
    }

    if (/^Improve:/i.test(trimmed)) {
      current = "Improve";
      return;
    }

    if (current && trimmed) {
      sections[current] +=
        (sections[current] ? "\n" : "") + trimmed;
    }
  });

  return sections;
}

export default function AIFeedbackSections({ finalText }) {
  const [open, setOpen] = useState({
    Strength: false,
    Gap: true,
    Improve: true
  });

  const cleanedText = cleanAIText(finalText);
  const sections = parseSections(cleanedText);

  const hasSections = Object.values(sections).some(Boolean);

  return (
    <div className="ai-feedback">

      {/* 🔥 FALLBACK IF AI FORMAT BREAKS */}
      {!hasSections && finalText && (
        <div className="ai-section-content">
          <HighlightedText
            text={finalText}
            highlights={extractHighlights(finalText)}
          />
        </div>
      )}

      {/* 🔥 NORMAL SECTIONS */}
      {Object.entries(sections).map(([section, content]) => {
        if (!content) return null;

        const highlights = extractHighlights(content);

        return (
          <div key={section} className="ai-section">

            <button
              className="ai-section-toggle"
              onClick={() =>
                setOpen((prev) => ({
                  ...prev,
                  [section]: !prev[section]
                }))
              }
            >
              {open[section] ? "▼" : "►"} {section}
            </button>

            {open[section] && (
              <div className="ai-section-content">
                <HighlightedText
                  text={content}
                  highlights={highlights}
                />
              </div>
            )}

          </div>
        );
      })}

    </div>
  );
}
