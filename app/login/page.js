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
        <div className="min-h-screen flex items-center justify-center bg-[#fdf6e3]">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    className="block border p-2 mb-2 w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block border p-2 mb-4 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="bg-[#d97706] text-white px-4 py-2 w-full">Login</button>
            </form>
        </div>
    );
}
