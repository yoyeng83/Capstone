"use client";

import { useState } from "react";
import { useCart } from "../components/CartContext";
import Navbar from "../components/Navbar";
import Image from "next/image"; 

export default function Menu() {
    const { addToCart } = useCart();

    const menuItems = [
        { id: 1, name: "Tonkotsu Ramen", basePrice: 10.99, img: "/images/tonkotsu.jpg", meats: ["Pork", "Chicken"], vegetables: ["Green Onion", "Bamboo Shoots", "Mushrooms"] },
        { id: 2, name: "Sushi Platter", basePrice: 15.99, img: "/images/sushi.jpg", meats: ["Salmon", "Tuna", "Eel"], vegetables: ["Cucumber", "Avocado"] },
        { id: 3, name: "Gyoza Dumplings", basePrice: 7.99, img: "/images/gyoza.jpg", meats: ["Pork", "Chicken", "Shrimp"], vegetables: ["Garlic", "Cabbage"] },
        { id: 4, name: "Takoyaki", basePrice: 6.99, img: "/images/takoyaki.jpg", meats: ["Octopus"], vegetables: ["Green Onion", "Bonito Flakes"] },
        { id: 5, name: "Katsu Curry", basePrice: 12.99, img: "/images/katsu.jpg", meats: ["Chicken", "Pork"], vegetables: ["Carrots", "Potato", "Onions"] },
        { id: 6, name: "Bulgogi Beef", basePrice: 14.99, img: "/images/bulgogi.jpg", meats: ["Beef"], vegetables: ["Green Onion", "Carrots"] },
        { id: 7, name: "Pho", basePrice: 11.99, img: "/images/pho.jpg", meats: ["Beef", "Chicken", "Shrimp"], vegetables: ["Bean Sprouts", "Thai Basil", "Lime"] },
        { id: 8, name: "Pad Thai", basePrice: 10.99, img: "/images/padthai.jpg", meats: ["Chicken", "Beef", "Shrimp", "Tofu"], vegetables: ["Green Onion", "Bean Sprouts", "Crushed Peanuts"] },
        { id: 9, name: "Bibimbap", basePrice: 13.99, img: "/images/bibimbap.jpg", meats: ["Beef", "Chicken", "Tofu"], vegetables: ["Carrots", "Spinach", "Bean Sprouts"] },
        { id: 10, name: "Okonomiyaki", basePrice: 9.99, img: "/images/okonomiyaki.jpg", meats: ["Pork", "Squid"], vegetables: ["Cabbage", "Green Onion"] },
        { id: 11, name: "Unagi Don", basePrice: 16.99, img: "/images/unagi.jpg", meats: ["Eel"], vegetables: ["None"] },
        { id: 12, name: "Karaage Chicken", basePrice: 8.99, img: "/images/karaage.jpg", meats: ["Chicken"], vegetables: ["None"] },
        { id: 13, name: "Onigiri", basePrice: 5.99, img: "/images/onigiri.jpg", meats: ["Tuna", "Salmon", "Umeboshi"], vegetables: ["Seaweed"] },
        { id: 14, name: "Chirashi Don", basePrice: 17.99, img: "/images/chirashi.jpg", meats: ["Salmon", "Tuna", "Eel", "Shrimp"], vegetables: ["Avocado", "Cucumber"] },
        { id: 15, name: "Miso Soup", basePrice: 4.99, img: "/images/miso.jpg", meats: ["Tofu"], vegetables: ["Green Onion", "Seaweed"] },
        { id: 16, name: "Tteokbokki", basePrice: 9.49, img: "/images/tteokbokki.jpg", meats: ["Fish Cake"], vegetables: ["Green Onion"] },
        { id: 17, name: "Yakisoba", basePrice: 10.49, img: "/images/yakisoba.jpg", meats: ["Chicken", "Pork", "Beef"], vegetables: ["Cabbage", "Carrots", "Green Onion"] },
        { id: 18, name: "Kimchi Jjigae", basePrice: 11.49, img: "/images/kimchi.jpg", meats: ["Pork", "Tofu"], vegetables: ["Kimchi", "Green Onion"] },
        { id: 19, name: "Omurice", basePrice: 9.99, img: "/images/omurice.jpg", meats: ["Chicken", "Beef"], vegetables: ["Onions", "Peas"] },
        { id: 20, name: "Fried Rice", basePrice: 8.99, img: "/images/friedrice.jpg", meats: ["Chicken", "Beef", "Pork", "Shrimp", "Tofu"], vegetables: ["Carrot", "Peas", "Green Onion", "Corn"] },
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

        const finalPrice = basePrice + meatPrice + vegPrice;

        const order = {
            id: `${item.id}-${custom.meat?.join("-") || "NoMeat"}-${custom.vegetables?.join("-") || "NoVeg"}`,
            name: `${item.name} with ${custom.meat?.join(", ") || "No Meat"}`,
            meat: custom.meat?.join(", ") || "None",
            vegetables: custom.vegetables?.join(", ") || "None",
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
                {filteredMenuItems.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#ffe4e1]">
                        <Image
                            src={item.img}
                            alt={item.name}
                            width={500}
                            height={300}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <h2 className="text-xl font-semibold mt-2 text-center text-[#d97706]">{item.name}</h2>
                        <p className="text-lg text-[#333] text-center">${item.basePrice.toFixed(2)}</p>

                        {/* Customization options */}
                        <div className="mt-4">
                            {/* Meat Selection */}
                            <div className="flex justify-between mb-2">
                                <label className="font-semibold text-[#ff6b6b]">Meats:</label>
                                <div className="space-x-2">
                                    {item.meats.map((meat, index) => (
                                        <label key={index} className="flex items-center text-[#ff99cc]">
                                            <input
                                                type="checkbox"
                                                value={meat}
                                                checked={customOrders[item.id]?.meat?.includes(meat) || false}
                                                onChange={(e) => {
                                                    const selectedMeats = e.target.checked
                                                        ? [...(customOrders[item.id]?.meat || []), meat]
                                                        : (customOrders[item.id]?.meat || []).filter(m => m !== meat);
                                                    handleCustomization(item.id, "meat", selectedMeats);
                                                }}
                                                className="mr-2"
                                            />
                                            {meat}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Vegetable Selection */}
                            <div className="flex justify-between mb-2">
                                <label className="font-semibold text-[#ff6b6b]">Vegetables:</label>
                                <div className="space-x-2">
                                    {item.vegetables.map((veg, index) => (
                                        <label key={index} className="flex items-center text-[#ff99cc]">
                                            <input
                                                type="checkbox"
                                                value={veg}
                                                checked={customOrders[item.id]?.vegetables?.includes(veg) || false}
                                                onChange={(e) => {
                                                    const selectedVegetables = e.target.checked
                                                        ? [...(customOrders[item.id]?.vegetables || []), veg]
                                                        : (customOrders[item.id]?.vegetables || []).filter(v => v !== veg);
                                                    handleCustomization(item.id, "vegetables", selectedVegetables);
                                                }}
                                                className="mr-2"
                                            />
                                            {veg}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleAddToCart(item)}
                            className="w-full mt-4 py-2 bg-[#ff6b6b] text-white font-semibold rounded-lg hover:bg-[#e53e3e]"
                        >
                            Add to Cart 🍱
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
