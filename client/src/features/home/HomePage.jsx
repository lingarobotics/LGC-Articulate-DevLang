// client/src/features/home/HomePage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThirukkuralSection from "../../components/ThirukkuralSection";

export default function HomePage() {
  const navigate = useNavigate();
  const [showThirukkural, setShowThirukkural] = useState(false);

  return (
    <div className="home-container">

      {/* HERO */}
      <div className="home-hero">
        <h1>Learn Articulation</h1>
        <p className="tagline">
          Think clearly. Speak confidently. Convey effectively.
        </p>
      </div>

      {/* CTA SECTION */}
      {!showThirukkural && (
        <div className="cta-section">
          <p className="cta-text">
            The purpose of this application was defined thousands of years ago by Thiruvalluvar. Do you want to see it?
          </p>
          <button
            className="primary-btn"
            onClick={() => setShowThirukkural(true)}
          >
            Discover
          </button>
        </div>
      )}

      {/* PHILOSOPHY SECTION */}
      {showThirukkural && <ThirukkuralSection />}

      {/* ACTIONS */}
      <div className="home-actions">

        <button
          className="primary-btn big"
          onClick={() => navigate("/learn")}
        >
          Start Learning
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/why")}
        >
          Why Articulation Matters
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/docs")}
        >
          How to Use (Docs)
        </button>

      </div>

    </div>
  );
}

