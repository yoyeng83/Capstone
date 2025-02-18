"use client";
import { useCart } from "../components/CartContext";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen">
            <h1 className="text-4xl font-bold text-center text-[#d97706]">🛒 Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-xl mt-6">Your cart is empty 😢</p>
            ) : (
                <div className="mt-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow">
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">💰 ${item.price.toFixed(2)}</p>
                                <p className="text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-300 px-3 py-1 rounded-l">➖</button>
                                <span className="px-4">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-300 px-3 py-1 rounded-r">➕</button>
                                <button onClick={() => removeFromCart(item.id)} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg">❌ Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
