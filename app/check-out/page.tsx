"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const FALLBACK =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const { cart, clearCart } = useCart();
  const { user, userData } = useAuth();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [imgSrc, setImgSrc] = useState<Record<string, string>>({});

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

  useEffect(() => {
    if (userData) {
      setForm((f) => ({
        ...f,
        name: `${userData.firstName} ${userData.lastName}`,
        email: user?.email || "",
        phone: userData.phoneNumber || "",
        address: userData.shippingAddress || "",
      }));
    }
  }, [userData, user]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + delivery;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!/^\+?[\d\s]{7,}$/.test(form.phone)) e.phone = "Valid phone required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!stripe || !elements) return;

    setLoading(true);
    setErrors({});

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/check-out/success`,
        payment_method_data: {
          billing_details: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: { line1: form.address, city: form.city },
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      setErrors({ payment: error.message || "Payment failed" });
      setLoading(false);
    } else {
      setSuccess(true);
      clearCart();
      if (user) {
        await addDoc(collection(db, "orders"), {
          userId: user.uid,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total,
          delivery,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: `${form.address}, ${form.city}`,
          notes: form.notes,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        });
      }
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-500 text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-2">
            Thanks {form.name.split(" ")[0]}, your order is confirmed.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            A confirmation will be sent to {form.email}
          </p>
          <div className="flex gap-3">
            <Link
              href="/Shop"
              className="flex-1 border-2 border-green-500 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account/profile"
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition text-center"
            >
              My Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart" className="text-green-600 hover:underline text-sm">
          ← Back to Cart
        </Link>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Delivery Details</h2>
            <div className="space-y-4">
              {(
                [
                  { field: "name", label: "Full Name", type: "text" },
                  { field: "email", label: "Email", type: "email" },
                  { field: "phone", label: "Phone Number", type: "tel" },
                  { field: "address", label: "Street Address", type: "text" },
                  { field: "city", label: "City", type: "text" },
                ] as const
              ).map(({ field, label, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [field]: e.target.value }))
                    }
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                      errors[field] ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Notes{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  rows={3}
                  placeholder="Special delivery instructions..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          </div>

          {/* Payment Element */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-2">Payment</h2>
            <p className="text-xs text-gray-400 mb-4">
              🔒 Your payment is secured by Stripe
            </p>
            <PaymentElement />
            {errors.payment && (
              <p className="text-red-500 text-sm mt-2">{errors.payment}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !stripe}
            className={`w-full py-4 rounded-xl font-bold text-lg transition ${
              loading || !stripe
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-green-500 hover:bg-green-600 active:scale-95 text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
          <h2 className="text-lg font-bold mb-4">
            Order Summary ({cart.length} items)
          </h2>

          <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={imgSrc[item.id] ?? item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                    onError={() =>
                      setImgSrc((prev) => ({ ...prev, [item.id]: FALLBACK }))
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery</span>
              <span>
                {delivery === 0 ? (
                  <span className="text-green-500">Free</span>
                ) : (
                  `$${delivery.toFixed(2)}`
                )}
              </span>
            </div>
            {subtotal < 50 && (
              <p className="text-xs text-green-600">
                Add ${(50 - subtotal).toFixed(2)} more for free delivery
              </p>
            )}
            <div className="flex justify-between font-bold text-base pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutContent() {
  const { cart } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/Shop");
      return;
    }

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const delivery = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + delivery;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#22c55e",
            borderRadius: "8px",
          },
        },
      }}
    >
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
