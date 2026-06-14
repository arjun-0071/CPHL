import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSearch } from '../../context/SearchContext';
import { getProductsByCategory, getCategoryBySlug, categories } from '../../data/products';
import './Products.css';

export default function Products() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchResults,
    setQuery,
  } = useSearch();

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const category = slug ? getCategoryBySlug(slug) : null;

  useEffect(() => {
    setQuery(''); // Clear search query on products/category pages
    if (category) {
      setSelectedCategory(category.id);
    } else {
      setSelectedCategory('');
    }
    return () => setSelectedCategory('');
  }, [slug, category, setSelectedCategory, setQuery]);

  const displayProducts = searchResults;

  return (
    <div className="products-page page-content">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" id="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          {category ? (
            <>
              <Link to="/products">Products</Link>
              <span>/</span>
              <span className="breadcrumb-current">{category.name}</span>
            </>
          ) : (
            <span className="breadcrumb-current">All Products</span>
          )}
        </nav>

        {/* Page Header */}
        <div className="products-header" id="products-header">
          <div className="products-header-left">
            <h1 className="products-title">
              {category ? (
                <>
                  <span className="products-title-icon">{category.icon}</span>
                  {category.name}
                </>
              ) : (
                'All Products'
              )}
            </h1>
            <span className="products-count">
              {displayProducts.length} products
            </span>
          </div>
          <div className="products-header-right">
            <button
              className="filter-toggle btn btn-outline btn-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <div className="sort-select-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                id="sort-select"
              >
                <option value="default">Sort: Default</option>
                <option value="name-az">Name: A to Z</option>
                <option value="name-za">Name: Z to A</option>
              </select>
            </div>
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside
            className={`products-sidebar ${showFilters ? 'show' : ''}`}
            id="filters-sidebar"
          >
            <div className="sidebar-header">
              <h3>Filters</h3>
              <button
                className="sidebar-close"
                onClick={() => setShowFilters(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Categories</h4>
              <button
                className={`filter-option ${!selectedCategory ? 'active' : ''}`}
                onClick={() => navigate('/products')}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-option ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => navigate(`/category/${cat.slug}`)}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                  <span className="filter-count">
                    {getProductsByCategory(cat.id).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Sort By</h4>
              {[
                { value: 'default', label: 'Default' },
                { value: 'name-az', label: 'Name: A to Z' },
                { value: 'name-za', label: 'Name: Z to A' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  className={`filter-option ${sortBy === opt.value ? 'active' : ''}`}
                  onClick={() => setSortBy(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="products-content">
            {displayProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3 className="empty-state-title">No products found</h3>
                <p className="empty-state-text">
                  Try adjusting your filters or search for something else.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedCategory('');
                    setSortBy('default');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'list' ? (
              <div className="products-list">
                {displayProducts.map((p) => (
                  <ProductCard key={p.id} product={p} horizontal />
                ))}
              </div>
            ) : (
              <div className="product-grid">
                {displayProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
