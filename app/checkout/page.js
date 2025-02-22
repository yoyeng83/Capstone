"use client";
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
        const [_, month, year] = match;
        const expDate = new Date(`20${year}`, month);
        return expDate > new Date();
    };

    const validateCvv = (cvv) => /^\d{3,4}$/.test(cvv);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setError("");

        if (!validateCardNumber(cardNumber)) {
            setError("Invalid card number.");
            return;
        }
        if (!validateExpiration(expiration)) {
            setError("Invalid or expired expiration date.");
            return;
        }
        if (!validateCvv(cvv)) {
            setError("Invalid CVV.");
            return;
        }
        if (deliveryOption === "delivery" && !address.trim()) {
            setError("Delivery address is required.");
            return;
        }

        setTimeout(() => {
            console.log("Payment Successful!");
            clearCart();
            router.push("/order-confirmation");
        }, 2000);
    };

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen">
            <h1 className="text-4xl font-bold text-center text-[#d97706]">🛒 Checkout</h1>
            <div className="mt-6">
                <div className="p-4 mb-4 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mt-2">
                            <div>
                                <h3>{item.name}</h3>
                                <p>Qty: {item.quantity}</p>
                                <p>Price: ${item.price.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 text-right">
                        <h3 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
                    </div>
                </div>
                <div className="p-4 mb-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Delivery Option</h2>
                    <select
                        className="p-2 border rounded w-full"
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                    >
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                    </select>
                    {deliveryOption === "delivery" && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                className="mt-2 p-2 border rounded w-full"
                                placeholder="Enter delivery address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                    )}
                </div>
                <div className="p-4 mb-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handlePlaceOrder}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Card Number</label>
                            <input
                                type="text"
                                className="mt-2 p-2 border rounded w-full"
                                placeholder="Enter card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Expiration Date</label>
                            <input
                                type="text"
                                className="mt-2 p-2 border rounded w-full"
                                placeholder="MM/YY"
                                value={expiration}
                                onChange={(e) => setExpiration(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">CVV</label>
                            <input
                                type="text"
                                className="mt-2 p-2 border rounded w-full"
                                placeholder="Enter CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg w-full">
                            Pay & Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
