import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shoes } from '../data/shoes';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = shoes.find(p => p.id === parseInt(id));
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="product-details fade-in">
      <div className="product-details-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-info-section">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-brand">{product.brand}</p>
          
          <div className="product-detail-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-value">{product.rating}</span>
            <span className="reviews">({product.reviews} reviews)</span>
          </div>
          
          <div className="product-detail-price">${product.price}</div>
          
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-features">
            <h3>Key Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="product-options">
            <div className="option-group">
              <label>Color:</label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="option-group">
              <label>Size:</label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart - ${product.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;