"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Import Auth context

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const { user } = useAuth(); // Get the logged-in user
    const [cart, setCart] = useState([]);

    // Function to get the cart key for the logged-in user
    const getCartKey = () => (user ? `cart-${user.username}` : "cart-guest");


    // Load cart from localStorage when the user logs in
    useEffect(() => {
        if (user) {
            const storedCart = localStorage.getItem(getCartKey());
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        }
    }, [user]); // Reload cart when user changes

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(getCartKey(), JSON.stringify(cart));
        }
    }, [cart, user]);

    // Add item to cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Update item quantity
    const updateQuantity = (id, amount) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    // Clear cart when user logs out
    const clearCart = () => {
        setCart([]);
    };

    // Calculate total price of all items in the cart
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, calculateTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
}