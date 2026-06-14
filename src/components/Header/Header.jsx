import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';
import { categories, searchProducts } from '../../data/products';
import './Header.css';

export default function Header() {
  const { cartCount } = useCart();
  const { query, setQuery } = useSearch();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    if (localQuery.trim().length > 1) {
      const results = searchProducts(localQuery).slice(0, 6);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [localQuery]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoriesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setQuery(localQuery.trim());
      setSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(localQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchFocused(false);
    setLocalQuery('');
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <header className="header" id="main-header">
        <div className="header-inner container">
          {/* Logo */}
          <Link to="/" className="header-logo" id="logo-link">
            <img src="/CPHL_Logo.png" alt="CPHL Logo" className="logo-icon-img" />
          </Link>

          {/* Search Bar */}
          <div className="header-search" ref={searchRef}>
            <form className="search-form" onSubmit={handleSearch}>
              <Search className="search-icon" size={22} />
              <input
                type="text"
                className="search-input"
                placeholder="Search for medicines, health products..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                id="search-input"
              />
              {localQuery && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => {
                    setLocalQuery('');
                    setSuggestions([]);
                  }}
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>

            {/* Search Suggestions */}
            {searchFocused && suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <Search size={14} className="suggestion-icon" />
                    <div className="suggestion-info">
                      <span className="suggestion-name">{product.name}</span>
                      {(product.manufacturer || product.packSize) && (
                        <span className="suggestion-meta">
                          {[product.manufacturer, product.packSize].filter(Boolean).join(' • ')}
                        </span>
                      )}
                    </div>
                    <span className="suggestion-price">
                      {product.price || 'Price on Request'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="header-actions">
            <Link to="/cart" className="header-cart" id="cart-link">
              <ShoppingCart size={26} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
              <span className="cart-label">Cart</span>
            </Link>

            {currentUser ? (
              <Link to="/profile" className="header-user" style={{ textDecoration: 'none' }}>
                <User size={26} />
                <span className="user-label">Account</span>
              </Link>
            ) : (
              <Link to="/login" className="header-user" style={{ textDecoration: 'none' }}>
                <User size={26} />
                <span className="user-label">Sign In</span>
              </Link>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="main-nav" id="main-nav">
          <div className="main-nav-inner container">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`nav-link ${location.pathname === '/products' || location.pathname.startsWith('/product/') ? 'active' : ''}`}
            >
              Products
            </Link>
            
            <div 
              className="nav-dropdown-container" 
              ref={dropdownRef}
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button 
                className={`nav-link nav-dropdown-trigger ${location.pathname.startsWith('/category/') ? 'active' : ''}`}
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              >
                Categories
              </button>
              
              {categoriesDropdownOpen && (
                <div className="nav-dropdown-menu">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="nav-dropdown-item"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    >
                      <span className="dropdown-icon">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/custom-request"
              className={`nav-link ${location.pathname === '/custom-request' ? 'active' : ''}`}
            >
              Custom Request
            </Link>
          </div>
        </nav>

        {/* Mobile Search */}
        <div className="mobile-search-bar" id="mobile-search">
          <form className="search-form" onSubmit={handleSearch}>
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search medicines, health products..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
            />
            {localQuery && (
              <button
                type="button"
                className="search-clear"
                onClick={() => {
                  setLocalQuery('');
                  setSuggestions([]);
                }}
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="mobile-menu" id="mobile-menu">
            <div className="mobile-menu-header">
              <img src="/CPHL_LOGO.svg" alt="CPHL Logo" className="logo-icon-img" />
              <span className="mobile-menu-title">CPHL</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="mobile-menu-links">
              <Link to="/profile" className="mobile-link">
                <User size={20} />
                My Account
              </Link>
              <Link to="/cart" className="mobile-link">
                <ShoppingCart size={20} />
                Cart
                {cartCount > 0 && (
                  <span className="mobile-cart-count">{cartCount}</span>
                )}
              </Link>
              <Link to="/products" className="mobile-link">
                <Package size={20} />
                All Products
              </Link>

              <div className="mobile-divider" />
              <p className="mobile-section-title">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="mobile-link"
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
