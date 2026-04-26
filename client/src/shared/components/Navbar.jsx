// client/src/shared/components/Navbar.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getToken, logout } from "../../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = getToken();

  function handleLogout() {
    sessionStorage.setItem("lgc-auth-logout", "1");
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  function goTo(path) {
    setMenuOpen(false);
    navigate(path);
  }

  return (
    <header className={`navbar ${menuOpen ? "is-open" : ""}`}>

      <div className="navbar-brand" onClick={() => goTo("/")}> 
        <img
          src="/lgc-logo.png"
          alt="LGC logo"
          className="navbar-logo"
        />
        <div className="navbar-title">LGC Articulate — DevLang</div>
      </div>

      <button
        className="navbar-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        Menu
      </button>

      <div className="navbar-menu">
        <nav className="navbar-links">

          <button onClick={() => goTo("/")}>Home</button>

          <button onClick={() => goTo("/docs")}>Docs</button>

          <button onClick={() => goTo("/contact")}>Contact</button>

        </nav>

        <div className="navbar-actions">

          {!token ? (
            <>
              <button
                className="nav-btn"
                onClick={() => goTo("/login")}
              >
                Login
              </button>

              <button
                className="nav-btn primary"
                onClick={() => goTo("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="nav-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </header>
  );
}