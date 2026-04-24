import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const totalPrice = getCartTotal();

  // Format Indian currency
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Indian pricing (free shipping above ₹15,000)
  const shipping = totalPrice > 15000 ? 0 : 999;
  const tax = totalPrice * 0.08;
  const grand = totalPrice + shipping + tax;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Shoe sizes for each cart item
  const [selectedSizes, setSelectedSizes] = useState(() => {
    const initialSizes = {};
    cart.forEach(item => {
      initialSizes[item.id] = "";
    });
    return initialSizes;
  });

  const [errors, setErrors] = useState({});
  const [sizeErrors, setSizeErrors] = useState({});

  const shoeSizes = [6, 7, 8, 9, 10, 11, 12];

  const handle = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
    if (sizeErrors[itemId]) {
      setSizeErrors(prev => ({ ...prev, [itemId]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const newSizeErrors = {};
    
    // Validate delivery details
    if (!form.fullName.trim()) newErrors.fullName = "Full name required";
    if (!form.phone.trim()) newErrors.phone = "Phone number required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter valid 10-digit mobile number";
    if (!form.email.trim()) newErrors.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter valid email";
    if (!form.address.trim()) newErrors.address = "Address required";
    if (!form.city.trim()) newErrors.city = "City required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode required";
    else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Enter valid 6-digit pincode";
    
    // Validate sizes for each cart item
    cart.forEach(item => {
      if (!selectedSizes[item.id]) {
        newSizeErrors[item.id] = "Please select size";
      }
    });
    
    setErrors(newErrors);
    setSizeErrors(newSizeErrors);
    return Object.keys(newErrors).length === 0 && Object.keys(newSizeErrors).length === 0;
  };

  const handleOrder = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    setIsPlacingOrder(true);
    
    // Create order object with sizes
    const orderData = {
      orderId: "ORD" + Date.now(),
      customer: form,
      items: cart.map(item => ({
        ...item,
        selectedSize: selectedSizes[item.id]
      })),
      sizes: selectedSizes,
      subtotal: totalPrice,
      shipping: shipping,
      tax: tax,
      total: grand,
      paymentMethod: "Cash on Delivery",
      orderDate: new Date().toISOString(),
      status: "Confirmed"
    };
    
    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.unshift(orderData);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    
    // Save current order for success page
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    
    // Simulate API call delay
    setTimeout(() => {
      clearCart();
      navigate("/order-success", { 
        state: { order: orderData }
      });
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <section className="checkout-page">
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some items before checking out</p>
          <button className="checkout-btn-primary" onClick={() => navigate("/products")}>
            Continue Shopping →
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">

        {/* LEFT COLUMN - ORDER FORM */}
        <div className="checkout-form-wrap">
          <div className="form-header">
            <h1>Checkout</h1>
            <p>Complete your order with Cash on Delivery</p>
          </div>

          {/* Select Shoe Sizes Section */}
          <div className="form-section">
            <div className="form-section-title">
              <span className="section-icon">👟</span> Select Shoe Size
            </div>
            
            <div className="size-selection-list">
              {cart.map((item) => (
                <div className="size-item" key={item.id}>
                  <div className="size-item-info">
                    <img src={item.image} alt={item.name} className="size-item-image" />
                    <div>
                      <div className="size-item-name">{item.name}</div>
                      <div className="size-item-price">{formatINR(item.price)}</div>
                    </div>
                  </div>
                  <div className="size-options">
                    <select 
                      value={selectedSizes[item.id] || ""}
                      onChange={(e) => handleSizeChange(item.id, e.target.value)}
                      className={sizeErrors[item.id] ? "error" : ""}
                    >
                      <option value="" disabled>Select Size</option>
                      {shoeSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    {sizeErrors[item.id] && (
                      <span className="error-text">{sizeErrors[item.id]}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Details Section */}
          <div className="form-section">
            <div className="form-section-title">
              <span className="section-icon">📦</span> Delivery Details
            </div>
            
            <div className="form-group">
              <label>Full Name *</label>
              <input 
                name="fullName" 
                value={form.fullName} 
                onChange={handle} 
                placeholder="John Doe"
                className={errors.fullName ? "error" : ""}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  name="phone" 
                  type="tel"
                  value={form.phone} 
                  onChange={handle} 
                  placeholder="9876543210"
                  maxLength={10}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handle} 
                  placeholder="john@example.com"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label>Address *</label>
              <input 
                name="address" 
                value={form.address} 
                onChange={handle} 
                placeholder="House No., Street, Landmark"
                className={errors.address ? "error" : ""}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input 
                  name="city" 
                  value={form.city} 
                  onChange={handle} 
                  placeholder="Mumbai"
                  className={errors.city ? "error" : ""}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>Pincode *</label>
                <input 
                  name="pincode" 
                  value={form.pincode} 
                  onChange={handle} 
                  placeholder="400001"
                  maxLength={6}
                  className={errors.pincode ? "error" : ""}
                />
                {errors.pincode && <span className="error-text">{errors.pincode}</span>}
              </div>
            </div>
          </div>

          {/* COD INFO BOX */}
          <div className="cod-info">
            <div className="cod-icon">💰</div>
            <div className="cod-text">
              <strong>Cash on Delivery</strong>
              <p>Pay in cash when your order is delivered. No online payment required.</p>
            </div>
          </div>

          <button 
            className={`place-order-btn ${isPlacingOrder ? "loading" : ""}`}
            onClick={handleOrder}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? "Placing Order..." : `Place Order (COD) • ${formatINR(grand)}`}
          </button>
          
          <p className="cod-note">
            🔒 Your personal information is secure. You'll pay only when you receive the product.
          </p>
        </div>

        {/* RIGHT COLUMN - ORDER SUMMARY */}
        <div className="order-summary">
          <div className="summary-header">
            <h3>Order Summary</h3>
            <span>{cart.length} item{cart.length > 1 ? "s" : ""}</span>
          </div>
          
          <div className="summary-items">
            {cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-size">
                    Size: {selectedSizes[item.id] || "Not selected"}
                  </div>
                  <div className="item-qty">Qty: {item.quantity}</div>
                </div>
                <div className="item-price">{formatINR(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
          
          <div className="summary-pricing">
            <div className="price-row">
              <span>Subtotal</span>
              <span>{formatINR(totalPrice)}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="free-tag">FREE</span> : formatINR(shipping)}</span>
            </div>
            <div className="price-row">
              <span>GST (8%)</span>
              <span>{formatINR(tax)}</span>
            </div>
            
            {shipping > 0 && (
              <div className="free-shipping-notice">
                ✨ Add {formatINR(15000 - totalPrice)} more for FREE shipping
              </div>
            )}
            
            <div className="price-row total">
              <span>Total to Pay (COD)</span>
              <span>{formatINR(grand)}</span>
            </div>
          </div>
          
          <div className="cod-badge">
            💰 Pay with Cash on Delivery
          </div>
          
          <div className="secure-badge">
            🔒 Secure Checkout • 100% Protected
          </div>
        </div>

      </div>
    </section>
  );
};

export default Checkout;