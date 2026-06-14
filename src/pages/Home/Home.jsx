import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Truck,
  Clock,
  Search,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import {
  categories,
  products,
  getProductsByCategory,
} from '../../data/products';
import './Home.css';

export default function Home() {
  const featured = products.slice(0, 8);
  const deals = products.slice(8, 18);

  return (
    <div className="home-page page-content">
      {/* ── Hero Section ── */}
      <section className="hero" id="hero-section">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <Shield size={14} /> Trusted Procurement Partner
            </div>
            <h1 className="hero-title">
              Your Reliable
              <br />
              <span className="hero-highlight">Pharma Procurement</span>
              <br />
              Platform
            </h1>
            <p className="hero-subtitle">
              Browse our extensive catalog of medicines, supplements, and
              medical supplies. Add items to your cart and submit your
              procurement request — no payment needed.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse Products <ArrowRight size={18} />
              </Link>
            </div>

          </div>
          <div className="hero-visual mockup-visual">
            <div className="mockup-bg-glow" />

            <div className="mockup-dashboard">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="dot dot-r"></span>
                  <span className="dot dot-y"></span>
                  <span className="dot dot-g"></span>
                </div>
                <div className="mockup-search"></div>
              </div>
              <div className="mockup-body">
                <div className="mockup-sidebar">
                  <div className="mockup-s-item active"></div>
                  <div className="mockup-s-item"></div>
                  <div className="mockup-s-item"></div>
                </div>
                <div className="mockup-screens">

                  {/* SCREEN 1: Browsing */}
                  <div className="mockup-screen screen-1">
                    <div className="mockup-title-bar">
                      <div className="mockup-line w-40"></div>
                      <div className="mockup-btn-sm"></div>
                    </div>
                    <div className="mockup-grid">
                      <div className="mockup-p-card">
                        <div className="mockup-img-ph"><img src="/products/AMB_KOF_PLUS_SYRUP.jpg" alt="Syrup" /></div>
                        <div className="mockup-line w-60"></div>
                        <div className="mockup-line w-40"></div>
                        <div className="mockup-btn-add" id="btn-add-1"></div>
                      </div>
                      <div className="mockup-p-card">
                        <div className="mockup-img-ph"><img src="/products/BolnolExtraTablet.jpg" alt="Tablet" /></div>
                        <div className="mockup-line w-70"></div>
                        <div className="mockup-line w-30"></div>
                        <div className="mockup-btn-add" id="btn-add-2"></div>
                      </div>
                    </div>
                  </div>

                  {/* SCREEN 2: Checkout */}
                  <div className="mockup-screen screen-2">
                    <div className="mockup-title-bar">
                      <div className="mockup-line w-30"></div>
                    </div>
                    <div className="mockup-cart-list">
                      <div className="mockup-cart-item">
                        <div className="mockup-img-sm"><img src="/products/AMB_KOF_PLUS_SYRUP.jpg" alt="Syrup" /></div>
                        <div className="mockup-cart-details">
                          <div className="mockup-line w-70"></div>
                          <div className="mockup-line w-30"></div>
                        </div>
                      </div>
                      <div className="mockup-cart-item">
                        <div className="mockup-img-sm"><img src="/products/BolnolExtraTablet.jpg" alt="Tablet" /></div>
                        <div className="mockup-cart-details">
                          <div className="mockup-line w-60"></div>
                          <div className="mockup-line w-40"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mockup-checkout-footer">
                      <div className="mockup-line w-40"></div>
                      <div className="mockup-btn-primary" id="btn-submit">Submit Order</div>
                    </div>
                  </div>

                  {/* SCREEN 3: Contact */}
                  <div className="mockup-screen screen-3">
                    <div className="mockup-success">
                      <div className="mockup-emoji-large">🧑‍💻</div>
                      <div className="mockup-success-title">Team Contacting</div>
                      <div className="mockup-line w-60"></div>
                      <div className="mockup-line w-40"></div>
                    </div>
                  </div>

                  {/* SCREEN 4: Delivered */}
                  <div className="mockup-screen screen-4">
                    <div className="mockup-success">
                      <div className="mockup-emoji-large">📦</div>
                      <div className="mockup-success-title">Order Delivered</div>
                      <div className="mockup-line w-50"></div>
                    </div>
                  </div>

                  {/* SCREEN 5: Happy Customer */}
                  <div className="mockup-screen screen-5">
                    <div className="mockup-success">
                      <div className="mockup-emoji-large">😊</div>
                      <div className="mockup-success-title">Success</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Cursor Overlay */}
              <div className="mockup-cursor">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.94c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.85.35z" fill="#000" stroke="#fff" strokeWidth="1.5" />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How CPHL Works</h2>
          </div>
          <div className="hiw-grid">
            <div className="hiw-step">
              <div className="hiw-number">1</div>
              <div className="hiw-icon">
                <Search size={28} />
              </div>
              <h3>Browse & Search</h3>
              <p>Explore our catalog of medicines, supplements, and medical supplies</p>
            </div>
            <div className="hiw-connector">
              <ChevronRight size={20} />
            </div>
            <div className="hiw-step">
              <div className="hiw-number">2</div>
              <div className="hiw-icon">🛒</div>
              <h3>Add to Cart</h3>
              <p>Select products and quantities you need for your procurement</p>
            </div>
            <div className="hiw-connector">
              <ChevronRight size={20} />
            </div>
            <div className="hiw-step">
              <div className="hiw-number">3</div>
              <div className="hiw-icon">📧</div>
              <h3>Submit Request</h3>
              <p>Complete checkout — your order is emailed to our team for processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section categories-section" id="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <Link to="/products" className="section-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="category-card"
                style={{
                  animationDelay: `${i * 80}ms`,
                  '--cat-color': cat.color,
                  backgroundImage: `url(${cat.image})`,
                }}
                id={`category-${cat.id}`}
              >
                <div className="category-color-overlay"></div>
                <div className="category-content-wrapper">
                  <h3 className="category-name">{cat.name}</h3>
                </div>
                <div className="category-arrow">
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section" id="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="section-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Deals ── */}
      <section className="section deals-section" id="deals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🔥 Best Deals</h2>
            <Link to="/products" className="section-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="scroll-container">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} horizontal />
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA Banner ── */}
      <section className="cta-banner" id="cta-banner">
        <div className="container cta-inner">
          <div className="cta-content">
            <h2>Ready to Place Your Procurement Order?</h2>
            <p>
              Browse our full catalog, add items to your cart, and submit your
              request. Our team will process your order and get back to you.
            </p>
            <Link to="/products" className="btn btn-accent btn-lg">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
          <div className="cta-visual">
            <div className="cta-emoji">📦</div>
          </div>
        </div>
      </section>
    </div>
  );
}
