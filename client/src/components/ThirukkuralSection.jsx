import React from "react";
import thiruvalluvarSvg from "../assets/illustrations/thiruvalluvar.svg";
import "./ThirukkuralSection.css";

export default function ThirukkuralSection() {
  return (
    <section className="thirukkural-section glass-card">
      <div className="thirukkural-content">
        <div className="thirukkural-svg-col">
          <img
            src={thiruvalluvarSvg}
            alt="Thiruvalluvar"
            className="thirukkural-svg"
            draggable="false"
          />
        </div>
        <div className="thirukkural-text-col">
          <div className="thirukkural-title">Core Philosophy</div>
          <div className="thirukkural-tamil">
            அவையறிந்து ஆராய்ந்து சொல்லுக சொல்லின்<br />
            தொகையறிந்த தூய்மை யவர்
          </div>
          <div className="thirukkural-meaning">
            "The wise speak after understanding their audience,<br />
            adapting their words with clarity and precision."
          </div>
          <div className="thirukkural-divider" />
          <div className="thirukkural-app-interpret">
            In LGC Articulate DevLang, articulation means:
            <ul>
              <li>Understanding context before expression</li>
              <li>Writing logic that adapts, not just executes</li>
              <li>Communicating intent with precision</li>
            </ul>
          </div>
          <div className="thirukkural-footer">
            Not inspired by Thirukkural — Built on it.
          </div>
        </div>
      </div>
    </section>
  );
}
