// Products.jsx
import { useState } from "react";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import shoes from "../data/shoes";

const filters = ["All", "Running", "Performance", "Trail", "Racing"];

const Products = () => {
  const [active, setActive] = useState("All");
  const [notification, setNotification] = useState(null);
  const { addToCart } = useCart();

  const filtered = active === "All"
    ? shoes
    : shoes.filter((s) => s.category === active);

  const handleAddToCart = (product) => {
    addToCart(product);
    
    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <section className="products-page">

      {/* Notification Toast */}
      {notification && (
        <div className="cart-toast">
          <span>✓</span> {notification}
        </div>
      )}

      <div className="products-header">
        <div className="header-eyebrow">SpeedStride Collection</div>
        <h1>Performance <span>Footwear</span></h1>
        <p>Engineered for speed, comfort, and style</p>
      </div>

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${active === f ? "active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.map((shoe, index) => (
          <div
            key={shoe.id}
            className="product-wrapper"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <ProductCard 
              product={shoe} 
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Products;