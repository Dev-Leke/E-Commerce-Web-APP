"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-4">GroceryMart</h3>
          <p className="text-gray-300">
            Fresh groceries delivered to your door. We make shopping easy, fast,
            and affordable.
          </p>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-8">
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
              <li>
                <Link href="/account">Account</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/help">Help Center</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} GroceryMart. All rights reserved.
      </div>
    </footer>
  );
}
