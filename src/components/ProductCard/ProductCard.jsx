import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/products';
import './ProductCard.css';

export default function ProductCard({ product, horizontal = false }) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const qty = getItemQuantity(product.id);
  const catIcon = categories.find(c => c.name === product.category)?.icon || '📦';
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, qty + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, qty - 1);
  };

  if (horizontal) {
    return (
      <Link
        to={`/product/${product.id}`}
        className="product-card-h"
        id={`product-h-${product.id}`}
      >
        <div className="pc-h-image" style={{ padding: '0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-secondary)' }}>
          {!imgError ? (
            <img src={product.image || '/placeholder.png'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} onError={() => setImgError(true)} />
          ) : (
            <span style={{ fontSize: '32px' }}>{catIcon}</span>
          )}
        </div>
        <div className="pc-h-details">
          <p className="pc-name">{product.name}</p>
          <p className="pc-meta" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '4px 0 8px 0' }}>{product.shortDescription}</p>
          <div className="price-container">
            <span className="price-sale" style={{ fontSize: '14px', color: 'var(--color-primary)' }}>{product.price || 'Price on Request'}</span>
          </div>
          <div className="pc-h-action">
            {qty === 0 ? (
              <button className="btn btn-outline btn-sm" onClick={handleAdd}>
                <ShoppingCart size={14} /> Add to Cart
              </button>
            ) : (
              <div className="qty-selector">
                <button className="qty-btn" onClick={handleDecrement}>
                  <Minus size={14} />
                </button>
                <span className="qty-count">{qty}</span>
                <button className="qty-btn" onClick={handleIncrement}>
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      id={`product-${product.id}`}
    >
      <div className="pc-image" style={{ padding: '0', overflow: 'hidden', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!imgError ? (
          <img src={product.image || '/placeholder.png'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', padding: '10px' }} onError={() => setImgError(true)} />
        ) : (
          <span style={{ fontSize: '48px' }}>{catIcon}</span>
        )}
      </div>

      <div className="pc-details">
        <h3 className="pc-name" style={{ marginBottom: '4px' }}>{product.name}</h3>
        <p className="pc-meta" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '35px', marginBottom: '8px' }}>
          {product.shortDescription}
        </p>

        <div className="price-container" style={{ marginBottom: '12px' }}>
          <span className="price-sale" style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: '700' }}>{product.price || 'Price on Request'}</span>
        </div>

        <div className="pc-action">
          {qty === 0 ? (
            <button className="pc-add-btn" onClick={handleAdd}>
              <Plus size={16} /> Add to Cart
            </button>
          ) : (
            <div className="qty-selector">
              <button className="qty-btn" onClick={handleDecrement}>
                <Minus size={14} />
              </button>
              <span className="qty-count">{qty}</span>
              <button className="qty-btn" onClick={handleIncrement}>
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
