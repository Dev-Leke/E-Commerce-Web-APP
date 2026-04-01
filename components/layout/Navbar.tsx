"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
        {/* LEFT: Logo */}
        <h1 className="text-xl font-bold whitespace-nowrap">GroceryMart</h1>

        {/* CENTER: Search Bar */}
        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-full text-black outline-none bg-white"
          />
        </div>

        {/* RIGHT: Links */}
        <div className="flex items-center gap-6 whitespace-nowrap">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/account">Account</Link>
        </div>
      </div>
    </nav>
  );
}
