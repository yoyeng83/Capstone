"use client";
import { useCart } from "../components/CartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const router = useRouter();

    const [reaction, setReaction] = useState(null); // No initial image
    const [showReaction, setShowReaction] = useState(false); // Control the visibility of the reaction image

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        if (reaction) {
            const timeout = setTimeout(() => {
                setShowReaction(false); // Hide the reaction image after 2 seconds
                setReaction(null); // Clear the current reaction
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [reaction]);

    const handleRemove = (id) => {
        setReaction("/images/sad.jpg"); // Show sad image when removing items
        setShowReaction(true); // Make sure the image appears
        removeFromCart(id);
    };

    const handleAdd = (id) => {
        setReaction("/images/happy.jpg"); // Show happy image when adding an item
        setShowReaction(true); // Make sure the image appears
        updateQuantity(id, 1);
    };

    const handleSubtract = (id) => {
        setReaction("/images/sad.jpg"); // Show sad image when subtracting quantity
        setShowReaction(true); // Make sure the image appears
        updateQuantity(id, -1);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        setReaction("/images/peace.jpg"); // Peace waifu when proceeding to checkout
        router.push("/checkout");
    };

    return (
        <div className="p-8 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 min-h-screen flex flex-col items-center relative">
            <h1 className="text-4xl font-bold text-center text-[#d97706] text-shadow-lg">🛒 Your Cart &amp;quot;</h1>

            {/* Waifu Emotion Image when Cart is Empty */}
            {cart.length === 0 && (
                <motion.div
                    key="sad-circle" // Unique key for the circular sad image
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8 }}
                    className="w-32 h-32 bg-center bg-cover rounded-full absolute top-16 left-1/3"
                    style={{
                        backgroundImage: 'url(/images/sad.jpg)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                />
            )}

            {/* Cart Content */}
            <div className="mt-6 relative z-10 w-full max-w-lg">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center mt-4">
                        <p className="text-center text-xl mt-4 italic text-gray-600">
                            &quot;Oh no, your cart is empty!&quot;
                        </p>
                    </div>
                ) : (
                    <div className="mt-6">
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-lg"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-[#d97706]">{item.name}</h2>
                                    <p className="text-gray-600">💰 ${(Number(item.price) || 0).toFixed(2)} x {item.quantity}</p>
                                    {/* Display customizations */}
                                    <p className="text-gray-600">
                                        Portion: {item.size}, Meat: {item.meat}, Vegetables: {item.vegetables || "None"}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleSubtract(item.id)}
                                        className="bg-gray-300 px-3 py-1 rounded-l"
                                    >
                                        ➖
                                    </button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        onClick={() => handleAdd(item.id)}
                                        className="bg-gray-300 px-3 py-1 rounded-r"
                                    >
                                        ➕
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        ❌ Remove
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        <h2 className="text-2xl font-semibold text-right mt-4 text-[#d97706]">Total: ${totalPrice.toFixed(2)}</h2>
                        <button
                            onClick={handleCheckout}
                            className="bg-yellow-500 text-white px-6 py-2 rounded-lg w-full mt-4 hover:bg-yellow-600 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>

            {/* Show Emotion Reaction Image when Add/Remove/Subtract happens */}
            {showReaction && reaction && (
                <motion.div
                    key={reaction}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-20 right-10 w-64 h-64 bg-center bg-cover bg-opacity-40 rounded-xl"
                    style={{
                        backgroundImage: `url(${reaction})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                />
            )}

            {/* Waifu GIFs on the sides */}
            <div className="absolute top-0 left-0 w-1/4 h-full flex justify-center items-center z-10">
                <Image
                    src="https://media1.tenor.com/m/N4KzQ6kBFNwAAAAd/touhou-cooking.gif"
                    alt="Waifu Cooking Left"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </div>
            <div className="absolute top-0 right-0 w-1/4 h-full flex justify-center items-center z-10">
                <Image
                    src="https://media1.tenor.com/m/NYM7btpxHQ8AAAAd/konpaku-youmu.gif"
                    alt="Waifu Cooking Right"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </div>

            {/* Waifu Sparkles Animation */}
            <motion.div
                className="absolute bottom-10 left-10 text-4xl animate-ping"
                style={{
                    color: 'pink',
                    zIndex: 20,
                }}
            >
                💖✨
            </motion.div>

            <motion.div
                className="absolute bottom-10 right-20 text-3xl animate-pulse"
                style={{
                    color: '#d97706',
                    zIndex: 20,
                }}
            >
                🌟🎀
            </motion.div>

            {/* Shooting Star Animation */}
            <motion.div
                className="shooting-star left-0 top-0"
            ></motion.div>
            <motion.div
                className="shooting-star right-0 top-1/4"
            ></motion.div>
            <motion.div
                className="shooting-star bottom-0 left-1/4"
            ></motion.div>
        </div>
    );
}
