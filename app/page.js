export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#fdf6e3]">
            {/* Circular Background Image Container */}
            <div
                className="relative w-60 h-60 sm:w-80 sm:h-80 bg-center bg-cover rounded-full flex items-center justify-center text-center shadow-xl"
                style={{ backgroundImage: "url('/images/dudu.jpg')" }}
            >
                {/* Dark Overlay for Better Contrast */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full"></div>

                {/* Animated Title */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 relative z-10 drop-shadow-lg text-center">
                    Welcome to Waifood!
                </h1>
            </div>

            {/* Description */}
            <p className="mt-6 text-lg text-gray-700 text-center max-w-lg">
                Enjoy customized, delicious fried rice made just for you!
            </p>

            {/* View Menu Button */}
            <a
                href="/menu"
                className="mt-6 px-6 py-3 bg-[#d97706] text-white text-lg font-semibold rounded-full shadow-md hover:bg-[#b86405] transition"
            >
                🍽️ View Menu
            </a>
        </main>
    );
}
