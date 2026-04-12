"use client";

import { useState } from "react";

import itemsData from "../product/[id]/productList";


export default function ShopPage() {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState({});

  const categories = ["All", ...new Set(itemsData.map((item) => item.category))];

  const filteredItems = filter === "All"
    ? itemsData
    : itemsData.filter((item) => item.category === filter);

  const handleQuantityChange = (id, amount) => {
    setCart((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + amount, 0),
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">FreshMart Shop</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border ${filter === cat ? "bg-green-500 text-white" : "bg-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="border rounded-2xl shadow p-4">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2 rounded" />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >-</button>
              <span>{cart[item.id] || 0}</span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
