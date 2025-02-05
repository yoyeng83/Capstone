"use client";
import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const menuItems = ["Fried Rice", "Noodles", "Soup", "Dumplings", "Curry", "BBQ Pork"];

    const filteredItems = menuItems.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search for food..."
                className="p-2 border rounded w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <ul className="mt-2 bg-white border rounded p-2">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => <li key={index}>{item}</li>)
                    ) : (
                        <li>No results found.</li>
                    )}
                </ul>
            )}
        </div>
    );
}
