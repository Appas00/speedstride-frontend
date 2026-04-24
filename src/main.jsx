// src/main.jsx (or index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import AppRoutes from './routes/AppRoutes'; // Import your routes
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>  {/* Wrap with CartProvider */}
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);