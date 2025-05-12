"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        fetch("http://127.0.0.1:8000/api/auth/signup/", {
            method: "POST",

            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert("Signup successful! Redirecting to login...");
            router.push("/login");
        } else {
            const data = await response.json();
            setError(data.detail);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-lime-100 to-yellow-200">
            <form onSubmit={handleSignUp} className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
                <h2 className="text-3xl font-semibold text-center text-[#ff6b6b] mb-6 drop-shadow-lg">Join Waifood 🍣</h2>
                {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}

                <input
                    type="text"
                    placeholder="Choose your username"
                    className="block border border-[#ff99cc] p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Set your password"
                    className="block border border-[#ff99cc] p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-[#ff6b6b] text-white font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
                >
                    Sign Up 🍜
                </button>
                <div className="mt-4 text-center">
                    <p className="text-sm text-[#ff99cc]">Already have an account?</p>
                    <a href="/login" className="text-[#d97706] font-semibold">Log in here</a>
                </div>
            </form>
        </div>
    );
}
