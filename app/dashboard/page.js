"use client";
import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-200">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center border-4 border-pink-400">
                <div className="relative">
                    <h2 className="text-3xl font-extrabold text-pink-600 mb-4">Welcome, {user.username}-kun! 💖</h2>
                    <p className="text-lg text-gray-700 italic">Your waifu is waiting to serve you~ 🍜✨</p>
                </div>

                {/* Chibi Speech Bubble */}
                <div className="relative mt-6 p-4 bg-pink-100 border-2 border-pink-400 rounded-xl shadow-md">
                    <p className="text-md text-pink-700 font-bold">"Let’s get you something delicious, nya~! 🍙💕"</p>
                </div>

                {/* Start Button */}
                <Link href="/menu">
                    <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-md hover:bg-pink-600 transition duration-300">
                        Start Ordering! 🍽️💞
                    </button>
                </Link>
            </div>
        </div>
    );
}
