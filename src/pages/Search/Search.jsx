import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight, ArrowLeft } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSearch } from '../../context/SearchContext';
import './Search.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const { query, setQuery, searchResults } = useSearch();

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
    }
  }, [queryParam, setQuery]);

  return (
    <div className="search-page page-content">
      <div className="container">
        <Link to="/products" className="pd-back">
          <ArrowLeft size={18} /> All Products
        </Link>

        <div className="search-results-header">
          <h1>
            <SearchIcon size={28} /> Search Results
          </h1>
          {query && (
            <p className="search-results-query">
              Showing results for &quot;<strong>{query}</strong>&quot;
              <span className="search-results-count">
                ({searchResults.length} products)
              </span>
            </p>
          )}
        </div>

        {searchResults.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No results found</h3>
            <p className="empty-state-text">
              We couldn&apos;t find any products matching &quot;{query}&quot;.
              Try a different search term.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse All Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {searchResults.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
