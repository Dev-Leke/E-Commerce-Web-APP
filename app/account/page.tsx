"use client";

export default function AccountPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">My Account</h2>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-300" />
          <div>
            <p className="font-semibold">AdeFlex</p>
            <p className="text-sm text-gray-500">
              adeflex@example.com
            </p>
          </div>
        </div>

        <ul className="space-y-3">
          <li className="cursor-pointer hover:text-green-600">
            📦 Order History
          </li>
          <li className="cursor-pointer hover:text-green-600">
            📍 Saved Addresses
          </li>
          <li className="cursor-pointer hover:text-green-600">
            💳 Payment Methods
          </li>
          <li className="cursor-pointer text-red-500">
            🚪 Log Out
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>$4.99</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery Fee</span>
          <span>$4.99</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>$9.98</span>
        </div>

        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}