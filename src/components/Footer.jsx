// src/components/Footer.jsx (Ultra Simple Text-Only)
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-name">SpeedStride</div>
          <p>Performance footwear for the modern athlete</p>
        </div>

        <div className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </div>

        <div className="footer-support">
          <a href="#">Support</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>© {currentYear} SpeedStride. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;