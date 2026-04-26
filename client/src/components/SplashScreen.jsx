import React, { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 🔥 LOCK SCROLL DURING SPLASH
    document.body.style.overflow = "hidden";

    // 🔥 FADE-IN TRIGGER
    setVisible(true);

    // 🔥 PROGRESS STAGES
    const t1 = setTimeout(() => setProgress(30), 800);
    const t2 = setTimeout(() => setProgress(80), 1800);
    const t3 = setTimeout(() => setProgress(100), 2800);

    // 🔥 END SPLASH AFTER 3s
    const end = setTimeout(() => {
      document.body.style.overflow = "auto"; // 🔥 RESTORE SCROLL
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(end);

      // safety restore
      document.body.style.overflow = "auto";
    };
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <div
        className={`splash-content ${visible ? "visible" : ""}`}
      >
        {/* 🔥 LOGO */}
        <img src="/lgc-logo.png" alt="LGC Logo" className="splash-logo" />

        {/* 🔥 TITLE */}
        <h1 className="splash-title">LGC Articulate</h1>

        {/* 🔥 TAGLINE */}
        <p className="splash-tagline">
          Think it right. Say it right. Convey it right.
        </p>

        {/* 🔥 LOADING BAR */}
        <div className="splash-loader">
          <div className="splash-loader-track">
            <div
              className="splash-loader-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 🔥 PERCENT TEXT */}
          <p className="splash-progress">{progress}%</p>
        </div>
      </div>
    </div>
  );
}
