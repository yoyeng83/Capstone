export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#fdf6e3]">
            {/* Circular Background Image Container */}
            <div
                className="relative w-60 h-60 sm:w-80 sm:h-80 bg-center bg-cover rounded-full flex items-center justify-center text-center shadow-lg"
                style={{ backgroundImage: "url('/images/dudu.jpg')" }}
            >
                {/* Dark Overlay for Contrast */}
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full"></div>

                {/* Title Without Pulse Animation */}
                <h1 className="text-6xl font-bold text-[#d97706]">
                    Welcome to Waifood!
                </h1>
            </div>
        </main>
    );
}
