"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function Navbar() {
  const { cart } = useCart();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const isClient = useIsClient();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/Shop?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className="w-full bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="text-xl font-bold whitespace-nowrap">
          GroceryMart
        </Link>

        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search for products... (press Enter)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full px-4 py-2 rounded-full text-black outline-none bg-white"
          />
        </div>

        <div className="flex items-center gap-6 whitespace-nowrap">
          <Link href="/" className="hover:text-green-200 transition">
            Home
          </Link>
          <Link href="/Shop" className="hover:text-green-200 transition">
            Shop
          </Link>
          <Link
            href="/account/profile"
            className="hover:text-green-200 transition"
          >
            Account
          </Link>

          <Link href="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {isClient && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
