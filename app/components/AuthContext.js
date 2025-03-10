"use client";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (storedUser) {
            setUser(storedUser);
            setCart(storedCart);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Retrieve cart from localStorage when the user logs in
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cart"); // Clear cart on logout
        setUser(null);
        setCart([]); // Reset cart
    };

    const addToCart = (item) => {
        const updatedCart = [...cart, item];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <AuthContext.Provider value={{ user, cart, login, logout, addToCart, removeFromCart }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
