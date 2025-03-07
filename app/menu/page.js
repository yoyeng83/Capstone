"use client";
import { useState } from "react";
import { useCart } from "../components/CartContext"; // Import useCart hook
import Link from "next/link"; // Import Link for navigation

export default function Menu() {
    const { addToCart } = useCart(); // Get addToCart function from context

    const [meat, setMeat] = useState("Chicken");
    const [vegetables, setVegetables] = useState([]);
    const [size, setSize] = useState("Medium");

    const meatOptions = ["Beef", "Pork", "Shrimp", "Chicken"];
    const vegetableOptions = ["Corn", "Thai Pepper", "Green Beans", "Carrot"];
    const sizeOptions = ["Small", "Medium", "Large"];

    const toggleVegetable = (veg) => {
        setVegetables((prev) =>
            prev.includes(veg) ? prev.filter((v) => v !== veg) : [...prev, veg]
        );
    };

    const handleAddToCart = () => {
        const item = {
            id: `${meat}-${size}-${vegetables.join("-")}`, // ✅ Correct usage of template literals
            name: `Fried Rice with ${meat}`, // ✅ Correct usage of template literals
            vegetables: vegetables.length ? vegetables.join(", ") : "None",
            size,
            price: size === "Small" ? 5.99 : size === "Medium" ? 7.99 : 9.99,
        };

    addToCart(item);
};

return (
    <div className="p-8 bg-[#fdf6e3] min-h-screen">
        <h1 className="text-4xl font-bold text-center text-[#d97706]">Customize Your Fried Rice 🍛</h1>

            {/* Vegetable Selection */ }
<div className="mt-6">
    <h2 className="text-xl font-semibold">Choose Your Vegetables:</h2>
    <div className="flex space-x-4 mt-2">
        {vegetableOptions.map((veg) => (
            <button
                key={veg}
                className={'px-4 py-2 rounded-lg ${vegetables.includes(veg) ? "bg-green-500 text-white" : "bg-gray-200"}'}
        onClick={() => toggleVegetable(veg)}
                        >
        {veg}
    </button>
                    ))}
</div>
            </div >

    {/* Portion Size Selection */ }
    < div className = "mt-6" >
                <h2 className="text-xl font-semibold">Choose Your Portion Size:</h2>
                <div className="flex space-x-4 mt-2">
                    {sizeOptions.map((option) => (
                        <button
                            key={option}
                            className={'px-4 py-2 rounded-lg ${size === option ? "bg-blue-500 text-white" : "bg-gray-200"}'}
                            onClick={() => setSize(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div >
            </div >

    {/* Order Summary */ }
    < div className = "mt-8 p-4 border rounded-lg bg-white" >
                <h2 className="text-lg font-bold">Your Order:</h2>
                <p>🍛 Fried Rice with <b>{meat}</b></p>
                <p>🥦 Vegetables: <b>{vegetables.length ? vegetables.join(", ") : "None"}</b></p>
                <p>🍽️ Portion Size: <b>{size}</b></p>
            </div >

    {/* Add to Cart Button */ }
    < button
onClick = { handleAddToCart }
className = "mt-4 bg-green-500 text-white px-6 py-2 rounded-lg w-full"
    >
                🛒 Add to Cart
            </button >

    {/* View Cart Button (Updated to use Link) */ }
    < div className = "mt-4 text-center" >
        <Link href="/cart" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            🛒 View My Cart
        </Link>
            </div >
        </div >
    );
}