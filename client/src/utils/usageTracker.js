// client/src/utils/usageTracker.js

export function getUsageCount() {
  return parseInt(localStorage.getItem("usageCount") || "0");
}

export function incrementUsage() {
  const current = getUsageCount();
  const updated = current + 1;
  localStorage.setItem("usageCount", updated);
  return updated;
}

export function resetUsage() {
  localStorage.setItem("usageCount", "0");
}