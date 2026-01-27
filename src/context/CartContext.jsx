import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage (runs only once)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Add item to cart (NORMALIZED)
  const addToCart = (product, quantity = 1) => {
    if (!product?._id) {
      console.warn("Product missing _id:", product);
      return;
    }

    // 🔥 Normalize images (VERY IMPORTANT)
    const normalizedProduct = {
      ...product,
      images: product.images?.length
        ? product.images
        : product.image
        ? [product.image]
        : [],
    };

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item._id === normalizedProduct._id
      );

      if (existingItem) {
        return prev.map((item) =>
          item._id === normalizedProduct._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...normalizedProduct, quantity }];
    });
  };

  // ❌ Remove single item
  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  // 🔢 Update quantity
  const updateQuantity = (_id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // 🧹 Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // 💰 Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
