import { createContext, useContext, useState, useMemo } from 'react';
import { products, categories } from '../data/products';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const searchResults = useMemo(() => {
    let results = [...products];

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter((p) => {
        const pCatSlug = p.category ? p.category.toLowerCase().replace(/ /g, '-') : '';
        return pCatSlug === selectedCategory;
      });
    }

    // Sort
    switch (sortBy) {
      case 'name-az':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return results;
  }, [query, selectedCategory, sortBy]);

  const value = {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchResults,
    categories,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
