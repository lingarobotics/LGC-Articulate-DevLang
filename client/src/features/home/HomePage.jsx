// client/src/features/home/HomePage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import ThirukkuralSection from "../../components/ThirukkuralSection";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HERO */}
      <div className="home-hero">
        <h1>Learn Articulation</h1>
        <p className="tagline">
          Think clearly. Speak confidently. Convey effectively.
        </p>
      </div>

      {/* PHILOSOPHY SECTION */}
      <ThirukkuralSection />

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

