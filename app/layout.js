"use client";

// app/layout.js
import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RMiyQAyRxmgsiXkyp7qEVmFSHxe2LYyq5Qnpp3DidUGHakqTrLYaoFeir17aECKvAgSCkJcJym0v6mTqsuJcaQJ00cMLHegwU");

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-[#fdf6e3] antialiased">
                <AuthProvider>
                    <CartProvider>
                        <Navbar />
                        <Elements stripe={stripePromise}>
                            {children}
                        </Elements>
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
