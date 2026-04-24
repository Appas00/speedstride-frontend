import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/images/logo.png";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">

        {/* LOGO */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="SpeedStride Logo" />
          <span>SpeedStride</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="navbar-links">
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
          <Link to="/products" className={isActive("/products") ? "active" : ""}>Products</Link>

          <button className="cart-nav-btn" onClick={() => navigate("/cart")}>
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
        <Link to="/products" className={isActive("/products") ? "active" : ""}>Products</Link>
        <Link to="/cart" className={isActive("/cart") ? "active" : ""}>
          Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;