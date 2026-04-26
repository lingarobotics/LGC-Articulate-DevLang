import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Correct CSS path
import "./styles/base.css";

// Correct App path
import App from "./app/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);