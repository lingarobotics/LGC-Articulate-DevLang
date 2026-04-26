// client/src/features/evaluate/HistoryPage.jsx

import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

export default function HistoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await apiFetch("/api/evaluate/user/history");
      const json = await res.json();

      console.log("HISTORY DATA:", json);

      if (!res.ok) throw new Error(json.error);

      setData(json.data || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 SCORE EXTRACTOR
  function getScore(text) {
    const match = text?.match(/Score:\s*(\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  // 🔥 COLOR BASED ON SCORE
  function getScoreClass(score) {
    if (score >= 80) return "score-strong";
    if (score >= 50) return "score-basic";
    return "score-missing";
  }

  if (loading) {
    return <p className="history-loading">Loading history...</p>;
  }

  return (
    <div className="history-container">

      <h2 className="history-title">Your Performance History</h2>

      {data.length === 0 && (
        <p className="history-empty">No attempts yet.</p>
      )}

      {data.map((item) => {
        const score = getScore(item?.aiFeedback?.final);

        return (
          <div key={item._id} className="history-card">

            {/* 🔥 TOP ROW */}
            <div className="history-header">

              <div className="history-question">
                {item.listenerQuestion}
              </div>

              {score !== null && (
                <div className={`history-score ${getScoreClass(score)}`}>
                  {score}/100
                </div>
              )}
            </div>

            {/* 🔥 USER RESPONSE */}
            <div className="history-response">
              {item.userResponse}
            </div>

            {/* 🔥 FEEDBACK PREVIEW */}
            {item?.aiFeedback?.final && (
              <div className="history-feedback">
                {item.aiFeedback.final.slice(0, 150)}...
              </div>
            )}

            {/* 🔥 DATE */}
            <div className="history-date">
              {new Date(item.createdAt).toLocaleString()}
            </div>

          </div>
        );
      })}
    </div>
  );
}
