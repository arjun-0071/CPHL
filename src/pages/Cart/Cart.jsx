import { Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingCart,
  Tag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

export default function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    cartMrpTotal,
    cartSavings,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h3 className="empty-state-title">Your Cart is Empty</h3>
            <p className="empty-state-text">
              Browse our products and add items to your procurement cart.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <ShoppingCart size={18} /> Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-content">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="breadcrumb-current">Cart</span>
        </nav>

        <div className="cart-header">
          <h1>
            <ShoppingCart size={28} /> Your Cart
          </h1>
          <span className="cart-item-count">{cartCount} items</span>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                <div className="cart-item-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-secondary)', overflow: 'hidden' }}>
                  <img 
                    src={item.image || '/placeholder.png'} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', padding: '8px' }} 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span style="font-size: 24px;">📦</span>';
                    }}
                  />
                </div>
                <div className="cart-item-details">
                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>
                  {(item.manufacturer || item.packSize) && (
                    <p className="cart-item-meta">
                      {[item.manufacturer, item.packSize].filter(Boolean).join(' • ')}
                    </p>
                  )}
                  <div className="cart-item-price-row">
                    <span className="cart-item-sale">{item.price || 'Price on Request'}</span>
                    {item.price && (
                      <>
                        <span className="cart-item-mrp">₹{Math.round(Number(item.price.replace(/[^0-9.-]+/g, "")) * 1.1)}</span>
                        <span className="cart-item-discount">10% off</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="cart-item-actions">
                  <div className="cart-qty-selector">
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus size={14} />
                    </button>
                    <span className="cart-qty-count">{item.quantity}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="cart-item-total">
                    ₹{item.price ? (Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(0) : 0}
                  </span>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-actions-row">
              <Link to="/products" className="btn btn-outline">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
              <button className="btn btn-outline cart-clear-btn" onClick={clearCart}>
                <Trash2 size={16} /> Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-summary" id="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-row">
              <span>Items ({cartCount})</span>
              <span>₹{cartMrpTotal.toFixed(0)}</span>
            </div>

            {cartSavings > 0 && (
              <div className="cart-summary-row cart-savings">
                <span>
                  <Tag size={14} /> Discount
                </span>
                <span>-₹{cartSavings.toFixed(0)}</span>
              </div>
            )}

            <div className="cart-summary-divider" />

            <div className="cart-summary-row cart-summary-total">
              <span>Total Amount</span>
              <span>₹{cartTotal.toFixed(0)}</span>
            </div>

            {cartSavings > 0 && (
              <div className="cart-savings-banner">
                🎉 You save ₹{cartSavings.toFixed(0)} on this order!
              </div>
            )}

            <Link
              to="/checkout"
              className="btn btn-primary btn-lg btn-block cart-checkout-btn"
              id="checkout-btn"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <p className="cart-note">
              ℹ️ This is a procurement request. No payment is required.
              Your order details will be sent to our team for processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
