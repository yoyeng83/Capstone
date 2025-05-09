"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderConfirmation() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        if (storedOrders.length === 0) {
            router.push("/");
        } else {
            setOrders(storedOrders);
        }
    }, [router]);

    // Function to delete an order
    const handleDeleteOrder = (orderId) => {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        if (updatedOrders.length === 0) {
            router.push("/");
        }
    };

    if (orders.length === 0) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen text-center">
            <h1 className="text-4xl font-bold text-[#d97706]">🎉 Order History</h1>
            <p className="text-lg mt-2">Thank you for ordering from Waifood! Your waifu appreciates your support. 💖</p>

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

                    <p className="font-semibold text-lg mt-4">
                        Order Status: <span className="text-blue-500">{order.status || "Pending"}</span>
                    </p>

                    {/* Display notification when order is completed */}
                    {order.status === "Completed" && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-500 text-green-700 rounded-lg">
                            {order.deliveryOption === "delivery" ? (
                                <>🚚 Your order is out for delivery!</>
                            ) : (
                                <>🏠 Your order is ready for pickup!</>
                            )}
                        </div>
                    )}

                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => handleDeleteOrder(order.id)}
                    >
                        Delete Order
                    </button>
                </div>
            ))}

            <button
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg"
                onClick={() => router.push("/")}
            >
                Back to Home
            </button>
        </div>
    );
}
