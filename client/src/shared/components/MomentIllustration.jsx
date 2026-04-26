import React, { useEffect, useState } from "react";

export default function MomentIllustration({
  src,
  alt,
  className = "",
  duration = 2400,
}) {
  const [visible, setVisible] = useState(Boolean(src));

  useEffect(() => {
    if (!src) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [src, duration]);

  if (!src || !visible) return null;

  return (
    <div className={`moment-illustration ${className}`.trim()} aria-hidden="true">
      <img src={src} alt={alt} className="coach-svg" />
    </div>
  );
}
