// src/components/ProductCard.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart(); // Make sure you have this

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add to cart logic
    addToCart(product);
    
    // Visual feedback
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="product-card">
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} />
        <div className="scan-line"></div>
        {product.tag && (
          <span className={`card-tag ${product.tag === "New" ? "new-drop" : "sale"}`}>
            {product.tag}
          </span>
        )}
      </div>
      
      <div className="card-divider"></div>
      
      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <h3 className="card-name">{product.name}</h3>
        
        <div className="card-rating">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
          <span className="rating-count">({product.reviews})</span>
        </div>
        
        <p className="card-desc">{product.description}</p>
        
        <div className="card-footer">
          <div className="card-price">
            {product.oldPrice && (
              <span className="old-price">₹{product.oldPrice.toLocaleString('en-IN')}</span>
            )}
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          
          <button 
            className={`card-cta ${isAdding ? "adding" : ""}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "✓" : "🛒"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;