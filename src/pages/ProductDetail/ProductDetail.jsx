import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Plus, Minus, Tag, ShoppingCart } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import { getProductBySlug, getProductsByCategory, categories } from '../../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);

  const product = getProductBySlug(slug);

  useEffect(() => {
    setImgError(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">Product Not Found</h3>
            <p className="empty-state-text">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const qty = getItemQuantity(product.id);
  const categoryName = product.category || '';
  const category = categories.find((c) => c.name === categoryName);
  const similar = getProductsByCategory(categoryName)
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  const catIcon = category ? category.icon : '📦';

  return (
    <div className="pd-page page-content">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" style={{ marginBottom: '40px' }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          {category && (
            <>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
              <span>/</span>
            </>
          )}
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <button className="pd-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        {/* Product Main */}
        <div className="pd-main">
          
          {/* Images */}
          <div className="pd-gallery" style={{ position: 'sticky', top: '100px' }}>
            <div className="pd-image-main" style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '24px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1/1', border: '1px solid var(--color-border)' }}>
              {!imgError ? (
                <img src={product.image || '/CPHL_Logo.png'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} onError={() => setImgError(true)} />
              ) : (
                <span style={{ fontSize: '100px' }}>{catIcon}</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="pd-info-section">
            {category && (
              <div className="pd-brand" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', marginBottom: '8px' }}>
                {category.name}
              </div>
            )}
            <h1 className="pd-title" style={{ fontSize: '32px', lineHeight: '1.2', color: 'var(--color-text)', marginBottom: '16px' }}>{product.name}</h1>
            
            <p className="pd-short-desc" style={{ fontSize: '16px', color: 'var(--color-text-light)', marginTop: '10px', lineHeight: '1.6' }}>
              {product.shortDescription}
            </p>

            <div className="pd-price-area" style={{ marginTop: '32px', padding: '24px', backgroundColor: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: '16px' }}>
              <div className="pd-price-main" style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                {product.price || 'Price on Request'}
              </div>

              <div className="pd-actions" style={{ marginTop: '24px' }}>
                {qty === 0 ? (
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => addToCart(product, 1)}
                  >
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                ) : (
                  <div className="pd-qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button
                      className="pd-qty-btn"
                      style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff' }}
                      onClick={() => updateQuantity(product.id, qty - 1)}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="pd-qty-count" style={{ fontSize: '20px', fontWeight: '600' }}>{qty}</span>
                    <button
                      className="pd-qty-btn"
                      style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'var(--color-primary)', color: '#fff' }}
                      onClick={() => updateQuantity(product.id, qty + 1)}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="pd-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '32px' }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', color: 'var(--color-text-light)', padding: '4px 10px', borderRadius: '100px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Benefits & Specifications */}
        <div className="pd-bottom">
          
          <div className="pd-benefits">
            <h2 className="pd-section-title" style={{ fontSize: '28px', marginBottom: '24px', color: 'var(--color-text)', borderBottom: '2px solid var(--color-primary)', display: 'inline-block', paddingBottom: '8px' }}>Key Benefits</h2>
            <div className="pd-desc" style={{ color: 'var(--color-text-light)', lineHeight: '1.8', fontSize: '16px', marginBottom: '32px' }}>
              {product.description}
            </div>
            {product.benefits && product.benefits.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', color: 'var(--color-text)' }}>
                    <CheckCircle size={24} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '16px', lineHeight: '1.6' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pd-specifications">
            <h2 className="pd-section-title" style={{ fontSize: '28px', marginBottom: '24px', color: 'var(--color-text)', borderBottom: '2px solid var(--color-primary)', display: 'inline-block', paddingBottom: '8px' }}>Specifications</h2>
            {product.specifications ? (
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <div key={key} style={{ display: 'flex', borderBottom: idx !== Object.entries(product.specifications).length - 1 ? '1px solid var(--color-border)' : 'none', backgroundColor: idx % 2 === 0 ? 'var(--color-bg-alt)' : '#fff' }}>
                    <div className="pd-spec-key">
                      {key}
                    </div>
                    <div className="pd-spec-value">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-light)' }}>No specifications available.</p>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <div className="pd-similar" style={{ marginTop: '100px', borderTop: '1px solid var(--color-border)', paddingTop: '80px' }}>
            <h2 className="section-title">Similar Products</h2>
            <div className="scroll-container">
              {similar.map((p) => (
                <div key={p.id} className="scroll-product-card">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
