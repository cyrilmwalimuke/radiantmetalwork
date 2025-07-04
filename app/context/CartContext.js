"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Create context
const CartContext = createContext();

// Export context hook
export const useCart = () => useContext(CartContext);

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...product, amount: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.amount, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.amount, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,getTotalQuantity,getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
