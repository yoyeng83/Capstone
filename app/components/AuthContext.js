'use client';

import { createContext, useState, useEffect, useContext } from 'react';

// Create an AuthContext
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // This will only run on the client-side
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []); // Run once when component mounts

    const login = (userData) => {
        // Store user info in localStorage and update the state
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        // Clear user info from localStorage and update state
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
