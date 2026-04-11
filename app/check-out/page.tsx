"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 3.99;
  const total = subtotal + delivery;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!/^\d{7,}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid phone required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!stripe || !elements) return;

    setLoading(true);

    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: { name: form.name, email: form.email },
      },
    });

    if (result.error) {
      setErrors({ payment: result.error.message || "Payment failed" });
      setLoading(false);
    } else {
      setSuccess(true);
      clearCart();
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-semibold mb-2">Order placed!</h2>
          <p className="text-gray-500 mb-6">
            Thanks {form.name}, your food is on its way.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Delivery details</h2>

        {(["name", "email", "phone", "address", "city"] as const).map((field) => (
          <div key={field}>
            <label className="block text-sm text-gray-500 mb-1 capitalize">
              {field}
            </label>
            <input
              value={form[field]}
              onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
            {errors[field] && (
              <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Order notes (optional)
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>

        <h2 className="text-xl font-semibold pt-2">Payment</h2>
        <div className="border border-gray-200 rounded-lg px-3 py-3">
          <CardElement options={{ style: { base: { fontSize: "14px" } } }} />
        </div>

        {errors.payment && (
          <p className="text-red-500 text-sm">{errors.payment}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Processing..." : `Place order - $${total.toFixed(2)}`}
        </button>
      </div>

    
      <div className="bg-gray-50 rounded-xl p-6 h-fit space-y-4">
        <h2 className="text-xl font-semibold">Your order</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Image
              src={item.image}
              alt={item.name}
              width={56}
              height={56}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <div className="border-t pt-4 space-y-1 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-black pt-2 text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) router.push("/");
  }, [cart, router]);

  if (cart.length === 0) return null;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}