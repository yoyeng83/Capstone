"use client";

import Image from "next/image";  // Import the Image component from next/image

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-r from-pink-200 to-yellow-100">
            {/* Hero Section */}
            <div className="relative w-60 h-60 sm:w-80 sm:h-80 bg-center bg-cover rounded-full shadow-xl border-4 border-yellow-500 flex items-center justify-center text-center"
                style={{ backgroundImage: "url('/images/tonkotsu.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full"></div>
                <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
                    Welcome to Waifood!
                </h1>
            </div>

            {/* Description */}
            <p className="text-xl sm:text-2xl mt-6 text-center text-gray-700 font-semibold">
                Where delicious food meets cute waifus! 🍜🍣💕
            </p>

            {/* Promotional Banner */}
            <div className="mt-6 bg-orange-200 p-4 rounded-lg text-center text-lg text-white font-semibold">
                <p>🌟 Special Deal! Get 10% off your first order! Use code: WAIFOOD10 🌟</p>
            </div>

            {/* Featured Waifu Food Cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <Image
                        src="/images/tonkotsu.jpg"
                        alt="Tonkotsu Ramen"
                        width={400}
                        height={300}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                    <h2 className="text-2xl mt-4 font-semibold">Tonkotsu Ramen</h2>
                    <p className="mt-2 text-gray-600">A hearty bowl of tonkotsu ramen with a rich broth.</p>
                    <a href="/menu" className="mt-4 text-orange-500 hover:text-orange-600">Order Now</a>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <Image
                        src="/images/sushi.jpg"
                        alt="Sushi Platter"
                        width={400}
                        height={300}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                    <h2 className="text-2xl mt-4 font-semibold">Sushi Platter</h2>
                    <p className="mt-2 text-gray-600">A beautiful assortment of fresh sushi.</p>
                    <a href="/menu" className="mt-4 text-orange-500 hover:text-orange-600">Order Now</a>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <Image
                        src="/images/gyoza.jpg"
                        alt="Gyoza Dumplings"
                        width={400}
                        height={300}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                    <h2 className="text-2xl mt-4 font-semibold">Gyoza Dumplings</h2>
                    <p className="mt-2 text-gray-600">Crispy dumplings with savory fillings.</p>
                    <a href="/menu" className="mt-4 text-orange-500 hover:text-orange-600">Order Now</a>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 w-full bg-pink-200 p-6 text-center text-white">
                <div className="flex justify-center gap-4">
                    <Image
                        src="/images/dudu.jpg"
                        alt="Waifu Footer Icon"
                        width={48}
                        height={48}
                        className="w-12 h-12"
                    />
                    <p className="text-xl">Thank you for choosing Waifood! Follow us on our waifu adventure.</p>
                </div>
                <p className="mt-4 text-lg">© 2025 Waifood. All rights reserved.</p>
            </footer>
        </main>
    );
}
