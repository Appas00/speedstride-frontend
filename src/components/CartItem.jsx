import "../styles/CartItem.css";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-image">
        {item.image}
      </div>

      <div className="cart-details">
        <h4>{item.name}</h4>
        <p className="price">₹{item.price}</p>

        <div className="qty-controls">
          <button onClick={() => onDecrease(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)}>+</button>
        </div>
      </div>

      <button className="remove-btn" onClick={() => onRemove(item.id)}>
        ✖
      </button>
    </div>
  );
};

export default CartItem;