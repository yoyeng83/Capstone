﻿"use client";
import { useCart } from "../components/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
    const { cart, calculateTotalPrice, clearCart } = useCart();
    const router = useRouter();

    const totalPrice = calculateTotalPrice();

    const [cardNumber, setCardNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [cvv, setCvv] = useState("");
    const [deliveryOption, setDeliveryOption] = useState("pickup");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateCardNumber = (number) => {
        const sanitized = number.replace(/\D/g, "");
        let sum = 0, alternate = false;
        for (let i = sanitized.length - 1; i >= 0; i--) {
            let n = parseInt(sanitized[i], 10);
            if (alternate) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            sum += n;
            alternate = !alternate;
        }
        return sanitized.length >= 13 && sanitized.length <= 19 && sum % 10 === 0;
    };

    const validateExpiration = (date) => {
        const match = date.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
        if (!match) return false;
        const [, month, year] = match;
        const expDate = new Date(`20${year}`, month - 1);
        return expDate > new Date();
    };

    const validateCvv = (cvv) => /^\d{3,4}$/.test(cvv);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        if (!validateCardNumber(cardNumber)) {
            setError("Invalid card number.");
            setIsSubmitting(false);
            return;
        }
        if (!validateExpiration(expiration)) {
            setError("Invalid or expired expiration date.");
            setIsSubmitting(false);
            return;
        }
        if (!validateCvv(cvv)) {
            setError("Invalid CVV.");
            setIsSubmitting(false);
            return;
        }
        if (deliveryOption === "delivery" && !address.trim()) {
            setError("Delivery address is required.");
            setIsSubmitting(false);
            return;
        }

        const newOrder = {
            id: Date.now(),
            items: cart,
            total: totalPrice,
            deliveryOption,
            address: deliveryOption === "delivery" ? address : "Pickup",
            date: new Date().toLocaleString(),
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const updatedOrders = [...existingOrders, newOrder];

        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        setTimeout(() => {
            clearCart();
            router.push("/order-confirmation");
        }, 2000);
    };

    return (
        <div className="p-8 bg-gradient-to-r from-pink-200 to-purple-300 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-10 tracking-wide">💖 Checkout</h1>
            <div className="mt-6 space-y-6">
                <div className="p-6 bg-white rounded-xl shadow-xl border-2 border-pink-300">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-4">🛍️ Order Summary</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mt-3">
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Price: ${(Number(item.price) || 0).toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-800">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 text-right">
                        <h3 className="text-2xl font-semibold text-pink-600">Total: ${totalPrice.toFixed(2)}</h3>
                    </div>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-xl border-2 border-pink-300">
                    <h2 className="text-xl font-semibold text-pink-600 mb-4">🎁 Delivery Option</h2>
                    <select
                        className="p-3 border-2 border-pink-300 rounded-lg w-full bg-pink-50 text-gray-700 hover:border-pink-400 transition duration-200"
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                    >
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                    </select>
                    {deliveryOption === "delivery" && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                className="mt-2 p-3 border-2 border-pink-300 rounded-lg w-full"
                                placeholder="Enter delivery address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                    )}
                </div>

                <div className="p-6 bg-white rounded-xl shadow-xl border-2 border-pink-300">
                    <h2 className="text-xl font-semibold text-pink-600 mb-4">💳 Payment Information</h2>
                    {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                    <form onSubmit={handlePlaceOrder}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input
                                type="text"
                                className="mt-2 p-3 border-2 border-pink-300 rounded-lg w-full focus:ring-2 focus:ring-pink-500"
                                placeholder="Enter card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                            <input
                                type="text"
                                className="mt-2 p-3 border-2 border-pink-300 rounded-lg w-full focus:ring-2 focus:ring-pink-500"
                                placeholder="MM/YY"
                                value={expiration}
                                onChange={(e) => setExpiration(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                                type="text"
                                className="mt-2 p-3 border-2 border-pink-300 rounded-lg w-full focus:ring-2 focus:ring-pink-500"
                                placeholder="Enter CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={`bg-pink-500 text-white px-6 py-3 rounded-lg w-full hover:bg-pink-600 transition duration-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
                            {isSubmitting ? "Processing..." : "💕 Pay & Place Order"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
