"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";

function ProfileContent() {
  const { user, userData } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = subtotal > 0 && subtotal < 50 ? 4.99 : 0;
  const total = subtotal + delivery;

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/account/login");
  };

  const initials = userData
    ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
    : (user?.email?.[0].toUpperCase() ?? "?");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
      {/* Left: Account Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6">My Account</h2>

        {/* Avatar + Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-lg">
              {userData ? `${userData.firstName} ${userData.lastName}` : "User"}
            </p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-8 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">{userData?.phoneNumber || "—"}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Address</span>
            <span className="font-medium text-right max-w-[60%]">
              {userData?.shippingAddress || "—"}
            </span>
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          <li>
            <Link
              href="/account/orders"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-gray-700"
            >
              <span>📦</span> Order History
            </Link>
          </li>
          <li>
            <Link
              href="/account/addresses"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-gray-700"
            >
              <span>📍</span> Saved Addresses
            </Link>
          </li>
          <li>
            <Link
              href="/account/payment"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-gray-700"
            >
              <span>💳</span> Payment Methods
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition text-red-500"
            >
              <span>🚪</span> Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Right: Cart Summary */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <Link
                href="/Shop"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition text-sm"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b text-sm"
                  >
                    <span className="text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span>
                    {delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/check-out"
                className="block w-full text-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                Proceed to Checkout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
