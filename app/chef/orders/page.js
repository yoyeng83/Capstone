"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthContext"; // Adjust the import path if needed

export default function ChefDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user?.role !== "chef") {
            router.push("/login");
        } else {
            const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            setOrders(storedOrders);
        }
    }, [user, router]);

    // Update order status
    const handleOrderStatusChange = (orderId, status) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: status } : order
        );
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen text-center">
            <h1 className="text-4xl font-bold text-[#d97706]">👨‍🍳 Chef Dashboard</h1>
            <p className="text-lg mt-2">Welcome to your dashboard, Chef! 💖</p>

            {orders.length === 0 ? (
                <p className="mt-10 text-center">No orders available...</p>
            ) : (
                <div className="mt-6">
                    {orders.map((order) => (
                        <div key={order.id} className="p-4 mt-6 bg-white rounded-lg shadow-md inline-block w-full max-w-xl">
                            <h2 className="text-2xl font-bold">Order Number: #{order.id}</h2>
                            <p className="text-md text-gray-600">Order Date: {order.date}</p>
                            <p className="text-md font-semibold mt-2">Delivery Method: {order.deliveryOption}</p>
                            {order.deliveryOption === "delivery" && (
                                <p className="text-md font-semibold">Address: {order.address}</p>
                            )}
                            <div className="mt-4 text-left">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center border-b py-2">
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                                <div className="mt-4 text-right text-xl font-bold">
                                    Total: ${order.total.toFixed(2)}
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="font-semibold">Order Status: {order.status || "Pending"}</p>
                                <button
                                    className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => handleOrderStatusChange(order.id, "In Progress")}
                                >
                                    Mark as In Progress
                                </button>
                                <button
                                    className="mt-2 ml-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => handleOrderStatusChange(order.id, "Completed")}
                                >
                                    Mark as Completed
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg"
                onClick={() => window.location.reload()}
            >
                Refresh Orders
            </button>
        </div>
    );
}
