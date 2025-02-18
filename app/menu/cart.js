"use client";
import { useCart } from "../components/CartContext"; // Import Cart Context
import Link from "next/link";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    // Calculate Total Price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen">
            <h1 className="text-4xl font-bold text-center text-[#d97706]">🛒 Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center mt-6 text-lg">
                    Your cart is empty. <Link href="/menu" className="text-blue-500">Go to Menu</Link>
                </p>
            ) : (
                <div className="mt-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg bg-white mb-4">
                            <div>
                                <h2 className="text-xl font-bold">{item.name}</h2>
                                <p className="text-lg text-gray-600">${item.price} x {item.quantity}</p>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-red-500 text-white rounded-lg mr-2">-</button>
                                <span className="text-lg font-bold">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-green-500 text-white rounded-lg ml-2">+</button>
                                <button onClick={() => removeFromCart(item.id)} className="ml-4 px-3 py-1 bg-gray-500 text-white rounded-lg">Remove</button>
                            </div>
                        </div>
                    ))}
                    <h2 className="text-2xl font-bold text-right mt-4">Total: ${totalPrice.toFixed(2)}</h2>
                    <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg w-full mt-4">Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
}
