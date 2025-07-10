"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'

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
  // const addToCart = (product) => {
  //   setCart((prev) => {
  //     const exists = prev.find((item) => item.id === product.id);
  //     if (exists) {
  //       return prev.map((item) =>
  //         item.id === product.id ? { ...item, amount: item.amount + 1 } : item
  //       );
  //     }
  //     return [...prev, { ...product, amount: 1 }];
  //   });
  // };


  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        toast.error("Item is already in the cart!", {
          style: {
            border: '1px solid #e0b64f',
            padding: '12px',
            color: '#713200',
          },
          icon: '⚠️',
        });
        return prev;
      }
  
      toast.success("Item added to cart!", {
        style: {
          border: '1px solid #4caf50',
          padding: '12px',
          color: '#155724',
        },
        icon: '🛒',
      });
  
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
