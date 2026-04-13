"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";

export default function CartPage() {
  const { cart, updateQty, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState<Record<string, string>>({});

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = subtotal > 0 && subtotal < 50 ? 4.99 : 0;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/shop"
          className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <Link href={`/product/${item.id}`}>
                <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={imgSrc[item.id] ?? item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    onError={() =>
                      setImgSrc((prev) => ({ ...prev, [item.id]: FALLBACK }))
                    }
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.id}`}>
                  <h2 className="font-semibold truncate hover:text-green-600 transition">
                    {item.name}
                  </h2>
                </Link>
                <p className="text-green-600 font-bold">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold transition"
                >
                  -
                </button>
                <span className="w-6 text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-300 hover:text-red-500 transition text-xl ml-2"
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Subtotal ({cart.length} items)
              </span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-semibold">
                {delivery === 0 ? (
                  <span className="text-green-500">Free</span>
                ) : (
                  `$${delivery.toFixed(2)}`
                )}
              </span>
            </div>
            {subtotal < 50 && subtotal > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Add ${(50 - subtotal).toFixed(2)} for free delivery</span>
              </div>
            )}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              if (!user) {
                router.push("/account/login?redirect=/check-out");
              } else {
                router.push("/check-out");
              }
            }}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold mb-3"
          >
            Proceed to Checkout
          </button>

          <Link
            href="/shop"
            className="block text-center text-green-600 hover:underline text-sm"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
