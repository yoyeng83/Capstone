"use client";
import { useState } from "react";
import SearchBar from "../components/SearchBar"; // Import SearchBar

export default function Menu() {
    const [meat, setMeat] = useState("chicken");
    const [vegetables, setVegetables] = useState([]);
    const [size, setSize] = useState("medium");

    const meatOptions = ["Beef", "Pork", "Shrimp", "Chicken"];
    const vegetableOptions = ["Corn", "Thai Pepper", "Green Beans", "Carrot"];
    const sizeOptions = ["Small", "Medium", "Large"];

    const toggleVegetable = (veg) => {
        setVegetables((prev) =>
            prev.includes(veg) ? prev.filter((v) => v !== veg) : [...prev, veg]
        );
    };

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen">
            <h1 className="text-4xl font-bold text-center text-[#d97706]">Customize Your Fried Rice 🍛</h1>

            {/* Search Bar */}
            <div className="mt-6 flex justify-center">
                <SearchBar />
            </div>

            {/* Meat Selection */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Choose Your Meat:</h2>
                <div className="flex space-x-4 mt-2">
                    {meatOptions.map((option) => (
                        <button
                            key={option}
                            className={`px-4 py-2 rounded-lg ${meat === option.toLowerCase()
                                    ? "bg-yellow-500 text-white"
                                    : "bg-gray-200"
                                }`}
                            onClick={() => setMeat(option.toLowerCase())}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vegetable Selection */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Choose Your Vegetables:</h2>
                <div className="flex space-x-4 mt-2">
                    {vegetableOptions.map((veg) => (
                        <button
                            key={veg}
                            className={`px-4 py-2 rounded-lg ${vegetables.includes(veg)
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200"
                                }`}
                            onClick={() => toggleVegetable(veg)}
                        >
                            {veg}
                        </button>
                    ))}
                </div>
            </div>

            {/* Portion Size Selection */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Choose Your Portion Size:</h2>
                <div className="flex space-x-4 mt-2">
                    {sizeOptions.map((option) => (
                        <button
                            key={option}
                            className={`px-4 py-2 rounded-lg ${size === option.toLowerCase()
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                                }`}
                            onClick={() => setSize(option.toLowerCase())}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 p-4 border rounded-lg bg-white">
                <h2 className="text-lg font-bold">Your Order:</h2>
                <p>🍛 Fried Rice with <b>{meat}</b></p>
                <p>🥦 Vegetables: <b>{vegetables.length ? vegetables.join(", ") : "None"}</b></p>
                <p>🍽️ Portion Size: <b>{size}</b></p>
            </div>
        </div>
    );
}
