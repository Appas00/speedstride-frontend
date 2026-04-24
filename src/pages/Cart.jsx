import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

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

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <button className="cart-btn-primary" onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>
      </section>
    );
  }

  // Update for Indian currency (free shipping above ₹15,000)
  const shipping = totalPrice > 15000 ? 0 : 999;
  const tax = totalPrice * 0.08;
  const grand = totalPrice + shipping + tax;

  return (
    <section className="cart-page">
      <div className="cart-header">
        <div className="header-eyebrow">Your Selection</div>
        <h1>Shopping <span>Cart</span></h1>
        <p>{cart.length} item{cart.length > 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="cart-layout">

        {/* ITEMS */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-image-wrap">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="item-info">
                <div className="item-category">{item.category}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-price">{formatINR(item.price)}</div>
              </div>

              <div className="item-controls">
                <div className="qty-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-subtotal">
                  {formatINR(item.price * item.quantity)}
                </div>
                <button className="item-remove" onClick={() => removeFromCart(item.id)}>
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        {/* SUMMARY */}
        <div className="cart-summary">
          <div className="summary-title">Order Summary</div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatINR(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span className="free">FREE</span> : formatINR(shipping)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>{formatINR(tax)}</span>
          </div>

          {shipping > 0 && (
            <div className="free-shipping-hint">
              Add {formatINR(15000 - totalPrice)} more for free shipping
            </div>
          )}

          <div className="summary-divider" />

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatINR(grand)}</span>
          </div>

          <button
            className="cart-btn-primary"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>

          <button
            className="cart-btn-ghost"
            onClick={() => navigate("/products")}
          >
            ← Continue Shopping
          </button>
        </div>

      </div>
    </section>
  );
};

export default Cart;