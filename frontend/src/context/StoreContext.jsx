import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("gadgetverse-cart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("gadgetverse-wishlist", []));
  const [user, setUser] = useState(() => readStorage("gadgetverse-user", null));
  const [toast, setToast] = useState(null);

  useEffect(() => localStorage.setItem("gadgetverse-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("gadgetverse-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => {
    if (user) localStorage.setItem("gadgetverse-user", JSON.stringify(user));
    else localStorage.removeItem("gadgetverse-user");
  }, [user]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = (message, type = "success") => setToast({ message, type });

  const addToCart = (product, quantity = 1) => {
    setCart(items => {
      const existing = items.find(item => item.id === product.id);
      if (existing) {
        return items.map(item => item.id === product.id
          ? { ...item, qty: item.qty + quantity }
          : item);
      }
      return [...items, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: quantity
      }];
    });
    notify(`${product.name} added to cart`);
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(items => items.filter(item => item.id !== id));
      return;
    }
    setCart(items => items.map(item => item.id === id ? { ...item, qty: quantity } : item));
  };

  const removeFromCart = id => setCart(items => items.filter(item => item.id !== id));

  const toggleWishlist = product => {
    const isSaved = wishlist.some(item => item.id === product.id);
    setWishlist(items => isSaved
      ? items.filter(item => item.id !== product.id)
      : [...items, product]);
    notify(isSaved ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
  };

  const signIn = account => {
    const accountData = account?.data?.data || account?.data || account || {};
    const username = accountData.username || accountData.userName || accountData.name;
    setUser({ ...accountData, username, userName: username });
  };
  const signOut = () => {
    setUser(null);
    notify("You have been signed out");
  };

  const value = {
    cart,
    wishlist,
    user,
    toast,
    cartCount: cart.reduce((total, item) => total + item.qty, 0),
    addToCart,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    signIn,
    signOut,
    notify
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toast && <div className={`store-toast ${toast.type}`} role="status">{toast.message}</div>}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside StoreProvider");
  return store;
}
