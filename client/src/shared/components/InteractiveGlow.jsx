import React, { useEffect, useRef } from "react";

const LERP = 0.14;

export default function InteractiveGlow() {
  const orbRef = useRef(null);
  const frameRef = useRef(null);
  const currentRef = useRef({ x: 0, y: 0, opacity: 0 });
  const targetRef = useRef({ x: 0, y: 0, opacity: 0 });
  const touchActiveRef = useRef(false);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const initialX = window.innerWidth * 0.5;
    const initialY = window.innerHeight * 0.3;

    currentRef.current = { x: initialX, y: initialY, opacity: 0 };
    targetRef.current = { x: initialX, y: initialY, opacity: 0 };

    const updateTarget = (x, y, opacity) => {
      targetRef.current.x = x;
      targetRef.current.y = y;
      targetRef.current.opacity = opacity;
    };

    const onMouseMove = (event) => {
      if (touchActiveRef.current) return;
      updateTarget(event.clientX, event.clientY, 0.09);
    };

    const onMouseLeave = () => {
      if (touchActiveRef.current) return;
      updateTarget(targetRef.current.x, targetRef.current.y, 0);
    };

    const onTouchStart = (event) => {
      touchActiveRef.current = true;
      const touch = event.touches[0];
      if (!touch) return;
      updateTarget(touch.clientX, touch.clientY, 0.065);
    };

    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateTarget(touch.clientX, touch.clientY, 0.065);
    };

    const onTouchEnd = () => {
      touchActiveRef.current = false;
      updateTarget(targetRef.current.x, targetRef.current.y, 0);
    };

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      current.opacity += (target.opacity - current.opacity) * LERP;

      orb.style.left = `${current.x}px`;
      orb.style.top = `${current.y}px`;
      orb.style.opacity = `${Math.max(0, Math.min(current.opacity, 0.1))}`;

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div className="interactive-glow" aria-hidden="true">
      <div ref={orbRef} className="interactive-glow__orb" />
    </div>
  );
}
