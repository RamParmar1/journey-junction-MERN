import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";
import logoImage from "../assets/favicon-main.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <div className="top-bar">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo">
            <img src={logoImage} height="42" alt="EliteTravel" />
          </div>
          <div className="logo-name">
            <Link to="/">Journey Junction</Link>
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle navigation"
        >

        </button>

        {/* Navigation Links */}
        <div className={`navbar ${menuOpen ? "open" : ""}`}>
          <nav>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Home
            </NavLink>
            <NavLink to="/packages" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Packages
            </NavLink>

            {/* ✅ Normal user only — admin ko My Bookings nahi dikhega */}
            {user && !user.isAdmin && (
              <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                My Bookings
              </NavLink>
            )}

            <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Contact
            </NavLink>

            {/* ✅ Admin-only link */}
            {user?.isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => (isActive ? "nav-link admin active" : "nav-link admin")}>
                Admin
              </NavLink>
            )}
          </nav>
        </div>

        {/* User Links */}
        <div className="user-links">
          {user ? (
            <>
              <Link to="/profile" className="user-name">
                {user.name || "User"}
              </Link>
              <button id="btn" className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;