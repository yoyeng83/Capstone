"use client";

import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");  // Reset error message before trying to login

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful, user data:", data); // Log response for debugging

                // Assign role based on username (or any other data prefer)
                const role = username === "chef123" ? "chef" : username === "yoyeng83" ? "admin" : "user";

                // Log the user in with the correct role
                login({ ...data.user, role }, data.access, data.refresh);

                // Optionally, redirect to the appropriate dashboard based on the role
                if (role === "chef") {
                    router.push("/chef/orders"); // Redirect to Chef Orders dashboard
                } else if (role === "admin") {
                    router.push("/admin/dashboard"); // Redirect to Admin Panel
                } else {
                    router.push("/menu"); // Default to menu page for other users
                }

            } else {
                const resData = await response.json();
                setError(resData.error || "Invalid credentials");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            console.error("Login error:", error); // Log the error for debugging
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-lime-100 to-yellow-200">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full">
                <h2 className="text-3xl font-semibold text-center text-[#ff6b6b] mb-6 drop-shadow-lg">Login to Waifood 🍣</h2>
                {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    className="block border border-[#ff99cc] p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block border border-[#ff99cc] p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-[#ff6b6b] text-white font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
                >
                    Login 🍜
                </button>
                <div className="mt-4 text-center">
                    <p className="text-sm text-[#ff99cc]">Don&apos;t have an account?</p>
                    <a href="/signup" className="text-[#d97706] font-semibold">Sign up here</a>
                </div>
            </form>
        </div>
    );
}
