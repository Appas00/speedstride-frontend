// src/pages/OrderSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null;

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f7f4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '28px',
        padding: '50px 40px',
        maxWidth: '550px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid #e9edf2',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', color: '#0f172a', marginBottom: '10px' }}>
          Order Confirmed!
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Thank you for your purchase</p>
        
        <div style={{ background: '#f8f7f4', borderRadius: '16px', padding: '20px', margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b' }}>Order ID:</span>
            <strong style={{ color: '#0f172a' }}>{order.orderId}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b' }}>Payment Method:</span>
            <strong style={{ color: '#0f172a' }}>Cash on Delivery</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ color: '#64748b' }}>Total Amount:</span>
            <strong style={{ color: '#0f172a' }}>{formatINR(order.total)}</strong>
          </div>
        </div>

        <div style={{ textAlign: 'left', background: '#f8f7f4', borderRadius: '16px', padding: '20px', margin: '20px 0' }}>
          <h3 style={{ fontSize: '1rem', color: '#b8973a', marginBottom: '12px' }}>📦 Delivery Address</h3>
          <p style={{ color: '#0f172a', lineHeight: '1.6', fontSize: '0.9rem' }}>
            {order.customer.fullName}<br />
            {order.customer.address}<br />
            {order.customer.city} - {order.customer.pincode}<br />
            Phone: {order.customer.phone}
          </p>
        </div>

        <div style={{ textAlign: 'left', background: '#f8f7f4', borderRadius: '16px', padding: '20px', margin: '20px 0' }}>
          <h3 style={{ fontSize: '1rem', color: '#b8973a', marginBottom: '12px' }}>Items Ordered</h3>
          {order.items.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#0f172a' }}>
              <span>{item.name} × {item.quantity}</span>
              <span>{formatINR(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate("/products")}
          style={{
            background: '#0f172a',
            color: '#f8f7f4',
            padding: '14px 32px',
            border: 'none',
            borderRadius: '100px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '20px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#b8973a';
            e.target.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#0f172a';
            e.target.style.color = '#f8f7f4';
          }}
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;