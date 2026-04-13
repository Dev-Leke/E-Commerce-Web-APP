"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import itemsData from "./productList";
import Link from "next/link";

const FALLBACK =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [src, setSrc] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const product = itemsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 mb-4">Product not found.</p>
        <Link href="/shop" className="text-green-600 hover:underline">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  const imageSrc = src ?? product.image;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back link */}
        <Link
          href="/shop"
          className="text-green-600 hover:underline text-sm mb-6 inline-block"
        >
          ← Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-md p-8">
          {/* Image */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              onError={() => setSrc(FALLBACK)}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-400 uppercase mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-green-600 text-2xl font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  added
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 active:scale-95 text-white"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="flex-1 py-3 rounded-lg font-semibold border-2 border-green-500 text-green-600 hover:bg-green-50 transition"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
