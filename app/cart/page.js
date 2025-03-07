"use client";
import { useCart } from "../components/CartContext";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const router = useRouter(); // Initialize router for navigation

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        router.push("/checkout"); // Redirect user to the checkout page
    };

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
                                <p className="text-gray-600">💰 ${item.price.toFixed(2)} x {item.quantity}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="bg-gray-300 px-3 py-1 rounded-l"
                                >
                                    ➖
                                </button>
                                <span className="px-4">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="bg-gray-300 px-3 py-1 rounded-r"
                                >
                                    ➕
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    ❌ Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <h2 className="text-2xl font-semibold text-right mt-4">Total: ${totalPrice.toFixed(2)}</h2>
                    <button
                        onClick={handleCheckout}
                        className="bg-yellow-500 text-white px-6 py-2 rounded-lg w-full mt-4"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}