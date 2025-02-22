"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            login(data.user, data.access, data.refresh);
        } else {
            const resData = await response.json();
            setError(resData.error || "Invalid credentials");
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