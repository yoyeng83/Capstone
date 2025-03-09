"use client";

import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Navbar({ onSearchChange }) {  // Accepting the onSearchChange prop
    const { user, logout } = useAuth();
    const { cart, clearCart } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();

    // Update searchQuery when search input changes, passing the value to parent component
    useEffect(() => {
        if (onSearchChange) {
            onSearchChange(searchQuery);  // Only update if onSearchChange exists
        }
    }, [searchQuery, onSearchChange]);  // Trigger the effect when searchQuery changes

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const handleLogout = () => {
        clearCart();
        logout();
    };

    const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="bg-gradient-to-r from-pink-400 to-purple-500 p-4 shadow-lg fixed w-full z-50 top-0">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/images/goofy.jpg" alt="Waifu Logo" width={40} height={40} className="rounded-full shadow-lg" />
                    <span className="text-2xl font-bold text-white drop-shadow-lg">Waifood 🍜✨</span>
                </Link>

                {/* Search Bar - Only show on the menu page */}
                {pathname === "/menu" && (
                    <div className="relative w-1/3 hidden md:block">
                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}  // Update searchQuery
                            className="w-full p-2 pl-10 rounded-full border-none bg-pink-100 text-gray-700 focus:ring-2 focus:ring-pink-300 outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 text-pink-500" size={18} />
                    </div>
                )}

                <div className="flex items-center gap-6">
                    <Link href="/menu" className="text-white text-lg hover:underline hover:text-yellow-300 transition">
                        🍽 Menu
                    </Link>

                    <Link href="/cart" className="relative">
                        <ShoppingCart className="text-white hover:text-yellow-300 transition" size={24} />
                        {mounted && totalCartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                                {totalCartItems}
                            </span>
                        )}
                    </Link>

                    {!user ? (
                        <>
                            <Link href="/login" className="bg-white text-pink-500 px-4 py-2 rounded-md shadow-md hover:bg-pink-200 transition">
                                💖 Login
                            </Link>
                            <Link href="/signup" className="bg-white text-pink-500 px-4 py-2 rounded-md shadow-md hover:bg-pink-200 transition">
                                🌸 Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-white font-semibold">
                                ✨ Hello, {user?.username ?? "Guest"}!
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                            >
                                ❌ Log Out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
