import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'cphl_cart';

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(`${product.name} added to cart`);
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (productId) => {
      const item = cartItems.find((i) => i.id === productId);
      return item ? item.quantity : 0;
    },
    [cartItems]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getNumericPrice = (priceStr) => {
    if (!priceStr) return 0;
    const num = Number(priceStr.replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + getNumericPrice(item.price) * item.quantity,
    0
  );
  const cartMrpTotal = cartItems.reduce(
    (sum, item) => sum + Math.round(getNumericPrice(item.price) * 1.1) * item.quantity,
    0
  );
  const cartSavings = cartMrpTotal - cartTotal;

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    cartMrpTotal,
    cartSavings,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
