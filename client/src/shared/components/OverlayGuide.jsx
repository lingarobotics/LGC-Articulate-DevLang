import React, { useEffect, useMemo, useRef, useState, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

import learnSvg from "../../assets/illustrations/learn.svg";
import evaluateSvg from "../../assets/illustrations/evaluation.svg";
import doubtSvg from "../../assets/illustrations/doubt.svg";
import professorSvg from "../../assets/illustrations/professor.svg";
import loginSvg from "../../assets/illustrations/use-right-when-user-enter-login-page.svg";
import forgotSvg from "../../assets/illustrations/used-in-forgot-pass-page.svg";
import successSvg from "../../assets/illustrations/on-login-successful.svg";
import logoutSvg from "../../assets/illustrations/use-right-after-user-logs-out.svg";

const DISPLAY_MS = 3600;
const FADE_OUT_MS = 280;
const PROFESSOR_MIN_MS = 45000;
const PROFESSOR_MAX_MS = 90000;
const IDLE_MS = 15000;

const routeGuideMap = {
  "/learn": {
    svg: learnSvg,
    message: "I’ll guide you through the learning flow. Take your time and read each step.",
    key: "learn",
  },
  "/evaluate": {
    svg: evaluateSvg,
    message: "Use Evaluate to test clarity, structure, and response quality.",
    key: "evaluate",
  },
  "/doubt": {
    svg: doubtSvg,
    message: "Ask a doubt when you want a more focused explanation or direction.",
    key: "doubt",
  },
  "/login": {
    svg: loginSvg,
    message: "Sign in to continue with your saved progress and history.",
    key: "login",
  },
  "/forgot-password": {
    svg: forgotSvg,
    message: "I’ll help you recover access. Enter your email to continue.",
    key: "forgot",
  },
};

// Overlay context for programmatic triggering
const OverlayGuideContext = createContext({ show: () => {} });
export function useOverlayGuide() {
  return useContext(OverlayGuideContext);
}

function getOverlayRoot() {
  return typeof document === "undefined"
    ? null
    : document.getElementById("overlay-root");
}

export default function OverlayGuide({ children }) {
  const location = useLocation();
  const [overlay, setOverlay] = useState(null);
  const [phase, setPhase] = useState("idle");
  const activeTimerRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const professorTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const shownProfessorRef = useRef(false);
  const isTypingRef = useRef(false);
  const lastRouteRef = useRef("");

  const routeKey = useMemo(() => location.pathname, [location.pathname]);

  function clearTimers() {
    if (activeTimerRef.current) {
      window.clearTimeout(activeTimerRef.current);
      activeTimerRef.current = null;
    }

    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    if (professorTimerRef.current) {
      window.clearTimeout(professorTimerRef.current);
      professorTimerRef.current = null;
    }
  }

  function hideOverlay() {
    setPhase("fade-out");
    fadeTimerRef.current = window.setTimeout(() => {
      setOverlay(null);
      setPhase("idle");
    }, FADE_OUT_MS);
  }

  function showOverlay(nextOverlay) {
    if (!nextOverlay) return;
    clearTimers();
    setOverlay(nextOverlay);
    setPhase("visible");
    activeTimerRef.current = window.setTimeout(() => {
      hideOverlay();
    }, nextOverlay.duration || DISPLAY_MS);
  }

  useEffect(() => {
    const root = getOverlayRoot();
    if (!root) return undefined;

    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const handleFocusIn = (event) => {
      isTypingRef.current = Boolean(
        event.target &&
        (
          event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.isContentEditable
        )
      );
      handleActivity();
    };

    const handleFocusOut = () => {
      isTypingRef.current = false;
      handleActivity();
    };

    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("scroll", handleActivity, { passive: true });
    window.addEventListener("keydown", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const routeOverlay = routeGuideMap[routeKey];
    if (!routeOverlay) {
      lastRouteRef.current = routeKey;
      return;
    }

    // Show the guide immediately when user enters a different route/mode.
    if (lastRouteRef.current !== routeKey) {
      showOverlay({
        ...routeOverlay,
        duration: DISPLAY_MS,
      });
      lastRouteRef.current = routeKey;
    }
  }, [routeKey]);

  useEffect(() => {
    const scheduleProfessor = () => {
      if (professorTimerRef.current) {
        window.clearTimeout(professorTimerRef.current);
      }

      const delay = PROFESSOR_MIN_MS + Math.floor(Math.random() * (PROFESSOR_MAX_MS - PROFESSOR_MIN_MS));

      professorTimerRef.current = window.setTimeout(() => {
        const idleMs = Date.now() - lastActivityRef.current;
        const shouldShow =
          !isTypingRef.current &&
          idleMs >= IDLE_MS &&
          !shownProfessorRef.current &&
          routeKey !== "/login" &&
          routeKey !== "/forgot-password" &&
          routeKey !== "/reset-password" &&
          routeKey !== "/verify";

        if (shouldShow) {
          shownProfessorRef.current = true;
          showOverlay({
            svg: professorSvg,
            message: "Pause here if needed. The strongest progress comes from a clear next step.",
            key: "professor",
          });
        }

        scheduleProfessor();
      }, delay);
    };

    scheduleProfessor();

    return () => {
      if (professorTimerRef.current) {
        window.clearTimeout(professorTimerRef.current);
      }
    };
  }, [routeKey]);

  const root = getOverlayRoot();
  return (
    <OverlayGuideContext.Provider value={{ show: showOverlay }}>
      {children}
      {root && overlay && createPortal(
        <div className={`overlay-guide overlay-guide--modal ${phase === "fade-out" ? "is-fading" : ""}`} aria-modal="true" role="dialog">
          <div className="overlay-guide__modal-content">
            <div className="overlay-guide__visual">
              <img src={overlay.svg} alt="Guidance" className="svg-guide coach-svg" />
            </div>
            <div className="dialogue-bubble">
              {overlay.message}
            </div>
          </div>
        </div>,
        root
      )}
    </OverlayGuideContext.Provider>
  );
}
