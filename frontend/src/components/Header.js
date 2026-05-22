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
    <>
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
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className="navbar desktop-navbar">
            <nav>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
              <NavLink to="/packages" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Packages</NavLink>
              {user && !user.isAdmin && <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>My Bookings</NavLink>}
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Contact</NavLink>
              {user?.isAdmin && <NavLink to="/admin" className={({ isActive }) => (isActive ? "nav-link admin active" : "nav-link admin")}>Admin</NavLink>}
            </nav>
            <div className="user-links">
              {user ? (
                <>
                  <Link to="/profile" className="user-name">{user.name || "User"}</Link>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="register-link">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar (Rendered via Portal to avoid CSS containing block bugs) */}
      {typeof window !== "undefined" && require("react-dom").createPortal(
        <>
          <div className={`menu-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}></div>
          <div className={`navbar mobile-navbar ${menuOpen ? "open" : ""}`}>
            <div className="sidebar-header">
              <span className="sidebar-title">Menu</span>
              <button className="close-btn" onClick={() => setMenuOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <nav>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/packages" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={() => setMenuOpen(false)}>Packages</NavLink>
              {user && !user.isAdmin && <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={() => setMenuOpen(false)}>My Bookings</NavLink>}
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={() => setMenuOpen(false)}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={() => setMenuOpen(false)}>Contact</NavLink>
              {user?.isAdmin && <NavLink to="/admin" className={({ isActive }) => (isActive ? "nav-link admin active" : "nav-link admin")} onClick={() => setMenuOpen(false)}>Admin</NavLink>}
            </nav>
            <div className="user-links">
              {user ? (
                <>
                  <Link to="/profile" className="user-name" onClick={() => setMenuOpen(false)}>{user.name || "User"}</Link>
                  <button className="logout-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="register-link" onClick={() => setMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default Header;