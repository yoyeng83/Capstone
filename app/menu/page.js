"use client";

import { useState } from "react";
import { useCart } from "../components/CartContext";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Menu() {
    const { addToCart } = useCart();

    const portionSizes = {
        Regular: 0,
        Median: 2,
        Large: 4,
        "Extra Large": 6
    };

    const menuItems = [
    { id: 1, name: "Tonkotsu Ramen", basePrice: 10.99, img: "/images/tonkotsu.jpg", meats: ["Pork Chashu"], vegetables: ["Green Onion", "Bamboo Shoots", "Mushrooms", "Seaweed", "Soft-Boiled Egg"] },
    { id: 2, name: "Sushi Platter", basePrice: 15.99, img: "/images/sushi.jpg", meats: ["Salmon", "Tuna", "Eel", "Shrimp"], vegetables: ["Cucumber", "Avocado", "Pickled Radish", "Seaweed"] },
    { id: 3, name: "Gyoza Dumplings", basePrice: 7.99, img: "/images/gyoza.jpg", meats: ["Pork", "Chicken"], vegetables: ["Cabbage", "Garlic", "Ginger", "Green Onion"] },
    { id: 4, name: "Takoyaki", basePrice: 6.99, img: "/images/takoyaki.jpg", meats: ["Octopus"], vegetables: ["Green Onion", "Bonito Flakes", "Seaweed"] },
    { id: 5, name: "Katsu Curry", basePrice: 12.99, img: "/images/katsu.jpg", meats: ["Chicken Katsu", "Pork Katsu"], vegetables: ["Carrots", "Potato", "Onions", "Peas"] },
    { id: 6, name: "Bulgogi Beef", basePrice: 14.99, img: "/images/bulgogi.jpg", meats: ["Beef"], vegetables: ["Green Onion", "Carrots", "Garlic", "Lettuce Wrap"] },
    { id: 7, name: "Pho", basePrice: 11.99, img: "/images/pho.jpg", meats: ["Beef Slices", "Chicken", "Shrimp"], vegetables: ["Bean Sprouts", "Thai Basil", "Lime", "Green Onion", "Cilantro"] },
    { id: 8, name: "Pad Thai", basePrice: 10.99, img: "/images/padthai.jpg", meats: ["Chicken", "Shrimp", "Tofu"], vegetables: ["Green Onion", "Bean Sprouts", "Crushed Peanuts", "Lime"] },
    { id: 9, name: "Bibimbap", basePrice: 13.99, img: "/images/bibimbap.jpg", meats: ["Beef", "Chicken", "Tofu"], vegetables: ["Carrots", "Spinach", "Bean Sprouts", "Kimchi", "Zucchini", "Fried Egg"] },
    { id: 10, name: "Okonomiyaki", basePrice: 9.99, img: "/images/okonomiyaki.jpg", meats: ["Pork Belly", "Squid", "Shrimp"], vegetables: ["Cabbage", "Green Onion", "Bonito Flakes", "Seaweed"] },
    { id: 11, name: "Unagi Don", basePrice: 16.99, img: "/images/unagi.jpg", meats: ["Grilled Eel"], vegetables: ["Seaweed", "Pickled Ginger"] },
    { id: 12, name: "Karaage Chicken", basePrice: 8.99, img: "/images/karaage.jpg", meats: ["Chicken"], vegetables: ["Shredded Cabbage", "Lemon Wedge"] },
    { id: 13, name: "Onigiri", basePrice: 5.99, img: "/images/onigiri.jpg", meats: ["Tuna Mayo", "Salmon", "Umeboshi"], vegetables: ["Seaweed", "Pickled Radish"] },
    { id: 14, name: "Chirashi Don", basePrice: 17.99, img: "/images/chirashi.jpg", meats: ["Salmon", "Tuna", "Eel", "Shrimp", "Ikura"], vegetables: ["Avocado", "Cucumber", "Shiso Leaf", "Pickled Radish"] },
    { id: 15, name: "Miso Soup", basePrice: 4.99, img: "/images/miso.jpg", meats: ["Tofu"], vegetables: ["Green Onion", "Seaweed", "Mushrooms"] },
    { id: 16, name: "Tteokbokki", basePrice: 9.49, img: "/images/tteokbokki.jpg", meats: ["Fish Cake"], vegetables: ["Green Onion", "Boiled Egg"] },
    { id: 17, name: "Yakisoba", basePrice: 10.49, img: "/images/yakisoba.jpg", meats: ["Chicken", "Pork", "Beef"], vegetables: ["Cabbage", "Carrots", "Green Onion", "Bean Sprouts"] },
    { id: 18, name: "Kimchi Jjigae", basePrice: 11.49, img: "/images/kimchi.jpg", meats: ["Pork Belly", "Tofu"], vegetables: ["Kimchi", "Green Onion", "Mushrooms"] },
    { id: 19, name: "Omurice", basePrice: 9.99, img: "/images/omurice.jpg", meats: ["Chicken", "Beef"], vegetables: ["Onions", "Peas", "Carrots"] },
    { id: 20, name: "Fried Rice", basePrice: 8.99, img: "/images/friedrice.jpg", meats: ["Chicken", "Pork", "Shrimp", "Tofu"], vegetables: ["Carrot", "Peas", "Green Onion", "Corn", "Egg"] },
];


    const [customOrders, setCustomOrders] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const handleCustomization = (id, type, value) => {
        setCustomOrders((prev) => ({
            ...prev,
            [id]: { ...prev[id], [type]: value },
        }));
    };

    const handleAddToCart = (item) => {
        const custom = customOrders[item.id] || {};
        const basePrice = item.basePrice;

        const meatPrice = custom.meat ? custom.meat.length * 1 : 0;
        const vegPrice = custom.vegetables ? custom.vegetables.length * 0.5 : 0;
        const portionPrice = portionSizes[custom.portion] || 0;

        const finalPrice = basePrice + meatPrice + vegPrice + portionPrice;

        const order = {
            id: `${item.id}-${custom.meat?.join("-") || "NoMeat"}-${custom.vegetables?.join("-") || "NoVeg"}-${custom.portion || "Small"}`,
            name: `${item.name} (${custom.portion || "Small"}) with ${custom.meat?.join(", ") || "No Meat"}`,
            meat: custom.meat?.join(", ") || "None",
            vegetables: custom.vegetables?.join(", ") || "None",
            portion: custom.portion || "Small",
            price: finalPrice.toFixed(2),
        };

        addToCart(order);
    };

    const filteredMenuItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen">
            <Navbar onSearchChange={setSearchQuery} />

            <h1 className="text-5xl font-bold text-center text-[#ff6b6b] drop-shadow-lg">✨ Waifood Menu ✨</h1>
            <p className="text-center text-lg text-[#ff99cc] mt-2">Customize your meal the waifu way! 💕</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {filteredMenuItems.map((item) => (
                    <div key={item.id} className="bg-white shadow-xl rounded-2xl p-4 transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl border border-pink-100">
                        <Image
                            src={item.img}
                            alt={item.name}
                            width={500}
                            height={300}
                            className="w-full h-48 object-cover rounded-xl"
                        />
                        <h2 className="text-2xl font-bold mt-3 text-center text-[#ff69b4]">{item.name}</h2>
                        <p className="text-center text-gray-600 mb-4">${item.basePrice.toFixed(2)}</p>

                        {/* Meats */}
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-[#ff6b6b] mb-1">Meats:</p>
                            <div className="flex flex-wrap gap-2">
                                {item.meats.map((meat, index) => (
                                    <label key={index} className={`px-3 py-1 rounded-full text-sm border cursor-pointer ${customOrders[item.id]?.meat?.includes(meat) ? 'bg-[#ff69b4] text-white' : 'bg-pink-100 text-[#ff69b4]'}`}>
                                        <input
                                            type="checkbox"
                                            value={meat}
                                            checked={customOrders[item.id]?.meat?.includes(meat) || false}
                                            onChange={(e) => {
                                                const selected = e.target.checked
                                                    ? [...(customOrders[item.id]?.meat || []), meat]
                                                    : (customOrders[item.id]?.meat || []).filter(m => m !== meat);
                                                handleCustomization(item.id, "meat", selected);
                                            }}
                                            className="hidden"
                                        />
                                        {meat}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Vegetables */}
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-[#ff6b6b] mb-1">Vegetables:</p>
                            <div className="flex flex-wrap gap-2">
                                {item.vegetables.map((veg, index) => (
                                    <label key={index} className={`px-3 py-1 rounded-full text-sm border cursor-pointer ${customOrders[item.id]?.vegetables?.includes(veg) ? 'bg-[#ff99cc] text-white' : 'bg-pink-100 text-[#ff69b4]'}`}>
                                        <input
                                            type="checkbox"
                                            value={veg}
                                            checked={customOrders[item.id]?.vegetables?.includes(veg) || false}
                                            onChange={(e) => {
                                                const selected = e.target.checked
                                                    ? [...(customOrders[item.id]?.vegetables || []), veg]
                                                    : (customOrders[item.id]?.vegetables || []).filter(v => v !== veg);
                                                handleCustomization(item.id, "vegetables", selected);
                                            }}
                                            className="hidden"
                                        />
                                        {veg}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Portion Size */}
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-[#ff6b6b] block mb-1">Portion Size:</label>
                            <select
                                value={customOrders[item.id]?.portion || "Small"}
                                onChange={(e) => handleCustomization(item.id, "portion", e.target.value)}
                                className="w-full border border-pink-200 rounded-md px-3 py-2 text-[#ff69b4] focus:outline-none focus:ring-2 focus:ring-[#ff69b4]"
                            >
                                {Object.keys(portionSizes).map((size) => (
                                    <option key={size} value={size}>{size} (+${portionSizes[size]})</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => handleAddToCart(item)}
                            className="w-full py-2 bg-[#ff6b6b] text-white font-bold rounded-xl hover:bg-[#ff4d4d] transition"
                        >
                            Add to Cart 🍱
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

