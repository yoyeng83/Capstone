"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";

export default function AdminDashboard() {
    const { user } = useAuth(); // Get the current user from context
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Redirect if not admin
    useEffect(() => {
        if (user?.role !== "admin") {
            router.push("/"); // Redirect to home if not an admin
        } else {
            fetchUsers(); // Fetch users if admin
        }
    }, [user, router]);

    // Updated fetchUsers function with error handling and content-type check
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/");

            // Check if the response is okay (status 200)
            if (!response.ok) {
                const responseText = await response.text(); // Read the response as text
                console.error(`Error fetching users: ${response.status} - ${responseText}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Check if the response is JSON
            const contentType = response.headers.get("Content-Type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Expected JSON response but got something else");
            }

            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    // Assign role to user (e.g., assign chef role)
    const handleAssignRole = async (userId, role) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/assign_role/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.access}`,
                },
                body: JSON.stringify({ role }),
            });

            if (response.ok) {
                fetchUsers(); // Refresh the users list
            } else {
                console.error("Failed to assign role");
            }
        } catch (error) {
            console.error("Error assigning role:", error);
        }
    };

    // Delete a user (if needed)
    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.access}`,
                },
            });

            if (response.ok) {
                fetchUsers(); // Refresh the users list
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen text-center">
            <h1 className="text-4xl font-bold text-[#d97706]">Admin Dashboard</h1>
            <p className="text-lg mt-2">Manage users and roles here.</p>

            <div className="mt-6">
                <h2 className="text-2xl">Users List</h2>
                <table className="mt-4 w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Username</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">
                                    {user.role !== "chef" && (
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                            onClick={() => handleAssignRole(user.id, "chef")}
                                        >
                                            Assign Chef Role
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete User
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg"
                onClick={() => router.push("/")}>
                Back to Home
            </button>
        </div>
    );
}
