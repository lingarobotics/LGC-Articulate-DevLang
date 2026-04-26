// client/src/shared/utils/highlight.js

/**
 * highlight.js
 *
 * Shared utility for extracting and processing highlight phrases
 * from AI feedback text.
 *
 * Used across:
 * - Evaluate Mode
 * - Doubt Mode
 * - HighlightedText component
 *
 * Ensures consistency in how phrases are identified and matched.
 */

/**
 * Extract quoted phrases from text
 * Example: "this is important" → ["this is important"]
 */
export function extractHighlights(text) {
  if (!text) return [];

  const matches = text.matchAll(/"([^"]+)"/g);
  return Array.from(matches).map((m) => m[1]);
}

/**
 * Escape regex special characters safely
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Generate highlight ranges inside original text
 * - Case insensitive
 * - Ignores punctuation differences
 */
export function getHighlightRanges(text, phrases) {
  if (!text || !phrases?.length) return [];

  const normalizedText = text.toLowerCase();

  const ranges = [];

  phrases.forEach((phrase, idx) => {
    if (!phrase) return;

    const cleaned = phrase
      .replace(/["'.,!?]/g, "")
      .toLowerCase();

    const regex = new RegExp(escapeRegExp(cleaned), "gi");

    let match;
    while ((match = regex.exec(normalizedText)) !== null) {
      const start = match.index;
      const end = start + cleaned.length;

      ranges.push({ start, end, idx });
    }
  });

  return mergeRanges(ranges);
}

/**
 * Merge overlapping highlight ranges
 */
function mergeRanges(ranges) {
  if (!ranges.length) return [];

  ranges.sort((a, b) => a.start - b.start);

  const merged = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    const current = ranges[i];

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
}