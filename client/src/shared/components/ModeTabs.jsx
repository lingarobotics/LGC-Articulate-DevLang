// client/src/shared/components/ModeTabs.jsx

import React from "react";
import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Learn", path: "/learn" },
  { label: "Evaluate", path: "/evaluate" },
  { label: "Doubt", path: "/doubt" }
];

export default function ModeTabs() {
  return (
    <nav className="mode-tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            isActive ? "tab active" : "tab"
          }
          end={tab.path === "/learn"} // 🔥 ensures proper active matching
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}