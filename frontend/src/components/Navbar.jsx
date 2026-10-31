import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";

export default function Navbar() {
  const location = useLocation();
  const { cartCount, user, signOut } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const isActive = (path) => location.pathname === path ? "active" : "";
  const displayName = user?.username || user?.userName || user?.name;

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        {/* Brand Logo */}
        <Link to="/" className="nav-brand">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Flame */}
            <path d="M9 18C9 20.5 10.5 22 12 22C13.5 22 15 20.5 15 18H9Z" fill="#ff7b54" opacity="0.8"/>
            <path d="M10 18C10 19.5 11 20.5 12 20.5C13 20.5 14 19.5 14 18H10Z" fill="#ff6b8b"/>
            {/* Body */}
            <path d="M12 2C15 6 16.5 10 16.5 14.5C16.5 16 15.5 17 14 17H10C8.5 17 7.5 16 7.5 14.5C7.5 10 9 6 12 2Z" fill="url(#nav-grad)" />
            {/* Fins */}
            <path d="M7.5 13L4.5 16.5V17H7.5V13Z" fill="#7c3aed"/>
            <path d="M16.5 13L19.5 16.5V17H16.5V13Z" fill="#7c3aed"/>
            {/* Window */}
            <circle cx="12" cy="9" r="2" fill="#fffbf7"/>
            <circle cx="12" cy="9" r="1" fill="#22d3ee"/>
            
            <defs>
              <linearGradient id="nav-grad" x1="12" y1="2" x2="12" y2="17" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ff7b54"/>
                <stop offset="0.5" stopColor="#ff6b8b"/>
                <stop offset="1" stopColor="#7c3aed"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="gradient-text" style={{ fontSize: '1.65rem' }}>GadgetVerse</span>
        </Link>

        {/* Gadget categories */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive("/")}`}>Home</Link>
          <Link to="/category/smartphones" className={`nav-link ${isActive("/category/smartphones")}`}>Phones</Link>
          <Link to="/category/laptops" className={`nav-link ${isActive("/category/laptops")}`}>Laptops</Link>
          <Link to="/category/audio" className={`nav-link ${isActive("/category/audio")}`}>Audio</Link>
          <Link to="/category/wearables" className={`nav-link ${isActive("/category/wearables")}`}>Wearables</Link>
          <Link to="/contact" className={`nav-link ${isActive("/contact")}`}>Contact</Link>
        </div>

        {/* Actions & Theme Switcher */}
        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme" style={{ border: 'none', outline: 'none' }}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          <Link to="/wishlist" className="btn-icon" title="Wishlist">♡</Link>
          
          <Link to="/cart" className="btn-icon badge-container" title="Cart">
            🛒
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <Link to="/profile" className="btn-icon" title="Profile">👤</Link>
          <Link to="/admin" className="btn btn-ghost btn-sm">Admin</Link>
          
          {user ? (
            <>
              <Link to="/profile" className="nav-user-name" title="View profile">
                {displayName || "Account"}
              </Link>
              <button className="btn btn-ghost btn-sm" onClick={signOut}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
