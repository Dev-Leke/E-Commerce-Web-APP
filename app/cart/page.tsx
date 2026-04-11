"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart();
  const router = useRouter();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 4.99;
  const total = subtotal + delivery;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Cart</h1>

        {cart.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative">
                <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
              </div>
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-green-600 font-bold">${item.price.toFixed(2)} / lb</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => updateQty(item.id, -1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQty(item.id, 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
            </div>

            <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between mb-2"><span>Delivery Fee</span><span>${delivery.toFixed(2)}</span></div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-lg mb-4"><span>Total</span><span>${total.toFixed(2)}</span></div>

        <button
          onClick={() => router.push("/check-out")}
          disabled={cart.length === 0}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}