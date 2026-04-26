// client/src/app/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes";

// 🔥 IMPORT SPLASH
import SplashScreen from "../components/SplashScreen";

// Global Layout Components
import Navbar from "../shared/components/Navbar";
import HelperPanel from "../shared/components/HelperPanel";
import InteractiveGlow from "../shared/components/InteractiveGlow";
import OverlayGuide from "../shared/components/OverlayGuide";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // 🔥 SHOW SPLASH FIRST
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <OverlayGuide>
        <div className="app-root">
          <InteractiveGlow />
          {/* 🔥 GLOBAL NAVBAR */}
          <Navbar />
          {/* 🔥 MAIN CONTENT */}
          <main className="app-container">
            {/* 🔥 OPTIONAL HELPER */}
            <HelperPanel />
            {/* 🔥 ROUTES */}
            <AppRoutes />
          </main>
        </div>
      </OverlayGuide>
    </Router>
  );
}