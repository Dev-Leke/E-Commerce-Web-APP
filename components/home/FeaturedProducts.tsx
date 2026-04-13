"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "../products/ProductCard";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 8)))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="w-full bg-white py-16">
        <p className="text-center text-red-500">{error}</p>
      </section>
    );

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            href="/Shop"
            className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium transition"
          >
            View All
            <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => addToCart({ ...product, quantity: 1 })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
