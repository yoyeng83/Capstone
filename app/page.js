export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-r from-pink-200 to-yellow-100">
            {/* Hero Section */}
            <div className="relative w-60 h-60 sm:w-80 sm:h-80 bg-center bg-cover rounded-full shadow-xl border-4 border-yellow-500 flex items-center justify-center text-center"
                style={{ backgroundImage: "url('/images/dudu.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full"></div>
                <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
                    Welcome to Waifood!
                </h1>
            </div>

            {/* Description */}
            <p className="text-xl sm:text-2xl mt-6 text-center text-gray-700 font-semibold">
                Where delicious food meets cute waifus! 🍜🍣💕
            </p>

            {/* Animated Waifu Emojis */}
            <div className="flex gap-4 mt-4 text-4xl animate-bounce">
                <span>🍙</span>
                <span>🍛</span>
                <span>🍡</span>
                <span>🍜</span>
            </div>

            {/* Go to Menu Button */}
            <a
                href="/menu"
                className="mt-8 bg-orange-500 text-white px-6 py-3 text-lg rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
                🍽️ Go to Menu
            </a>

            {/* Decorative Waifu Images */}
            <div className="mt-12 flex justify-center gap-8">
                <img src="https://media1.tenor.com/m/MJngBj0rZukAAAAd/anime-shopping.gif" alt="Shopping Waifu" className="w-40 h-40 rounded-lg shadow-lg" />
                <img src="https://media1.tenor.com/m/NYM7btpxHQ8AAAAd/konpaku-youmu.gif" alt="Food Waifu" className="w-40 h-40 rounded-lg shadow-lg" />
            </div>
        </main>
    );
}
