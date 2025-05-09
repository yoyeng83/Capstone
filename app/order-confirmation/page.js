"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderConfirmation() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        if (storedOrders.length === 0) {
            router.push("/");
        } else {
            setOrders(storedOrders);
            setLoading(false);
        }
    }, [router]);

    const handleDeleteOrder = (orderId) => {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        if (updatedOrders.length === 0) {
            router.push("/");
        }
    };

    if (loading) return <p className="text-center mt-10 text-xl">Loading your orders...</p>;

    if (orders.length === 0)
        return (
            <div className="p-8 bg-[#fdf6e3] min-h-screen text-center">
                <h1 className="text-3xl font-bold text-[#d97706]">🎉 No Orders Found</h1>
                <p className="text-lg mt-2">You haven&apos;t placed any orders yet. Start shopping now! 💖</p>
                <button
                    className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg"
                    onClick={() => router.push("/")}
                >
                    Back to Home
                </button>
            </div>
        );

    return (
        <div className="p-8 bg-[#fdf6e3] min-h-screen">
            <h1 className="text-4xl font-bold text-[#d97706] text-center">🎉 Order History</h1>
            <p className="text-lg text-center mt-2">Thank you for ordering from Waifood! Your waifu appreciates your support. 💖</p>

            {orders.map((order) => (
                <div
                    key={order.id}
                    className="p-6 mt-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out w-full max-w-3xl mx-auto"
                >
                    <h2 className="text-2xl font-bold text-gray-800">Order Number: #{order.id}</h2>
                    <p className="text-md text-gray-600 mt-1">Order Date: {order.date}</p>
                    <p className="text-md font-semibold mt-2">Delivery Method: {order.deliveryOption}</p>
                    {order.deliveryOption === "delivery" && (
                        <p className="text-md font-semibold">Address: {order.address}</p>
                    )}

                    <div className="mt-4 text-left">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border-b py-2">
                                <div>
                                    <h3 className="font-medium text-gray-700">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className="mt-4 text-right text-xl font-bold text-gray-800">
                            Total: ${order.total.toFixed(2)}
                        </div>
                    </div>

                    <p className="font-semibold text-lg mt-4">
                        Order Status:{" "}
                        <span className={`text-xl font-bold ${order.status === "Completed" ? "text-green-600" : "text-blue-500"}`}>
                            {order.status || "Pending"}
                        </span>
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

                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                            onClick={() => handleDeleteOrder(order.id)}
                        >
                            Delete Order
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                            onClick={() => alert(`Reordering ${order.id}`)}
                        >
                            Reorder Items
                        </button>
                    </div>
                </div>
            ))}

            <div className="mt-6 text-center">
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={() => router.push("/")}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
