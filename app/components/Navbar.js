"use client";

import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cart, clearCart } = useCart();
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        clearCart();
        logout();
    };

    const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 shadow-lg fixed w-full z-50 top-0">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-white">Home 🍔</Link>

                {/* Search Bar */}
                <div className="relative w-1/3 hidden md:block">
                    <input
                        type="text"
                        placeholder="Search menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 pl-10 rounded-full border-none focus:ring-2 focus:ring-orange-300 outline-none"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                </div>

                {/* Navigation Links & Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/menu" className="text-white text-lg hover:underline">Menu</Link>
                    <Link href="/cart" className="relative">
                        <ShoppingCart className="text-white" size={24} />
                        {totalCartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                                {totalCartItems}
                            </span>
                        )}
                    </Link>

                    {/* Authentication Links */}
                    {!user ? (
                        <>
                            <Link href="/login" className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-md hover:bg-orange-100">Login</Link>
                            <Link href="/signup" className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-md hover:bg-orange-100">SignUp</Link>
                        </>
                    ) : (
                        <>
                            <span className="text-white font-semibold">Hello, {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                            >
                                Log Out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}