"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
const categories = ["All", "Fruits", "Vegetables", "Dairy", "Meat", "Bakery"];

function ShopContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [imgSrc, setImgSrc] = useState<Record<string, string>>({});

  const filter = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchesCategory = filter === "All" || p.category === filter;
    const searchTerm = search || urlSearch;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const setCategory = (cat: string) => {
    if (cat === "All") {
      router.push("/Shop");
    } else {
      router.push(`/Shop?category=${cat}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          {filter === "All" ? "All Products" : filter}
          <span className="text-gray-400 text-lg font-normal ml-2">
            ({filtered.length} items)
          </span>
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              filter === cat
                ? "bg-green-500 text-white border-green-500"
                : "bg-white hover:border-green-400 text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-xl h-64 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-4">No products found.</p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="text-green-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition duration-300 flex flex-col group"
            >
              <Link href={`/product/${product.id}`}>
                <div className="w-full h-40 relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={imgSrc[product.id] ?? product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() =>
                      setImgSrc((prev) => ({ ...prev, [product.id]: FALLBACK }))
                    }
                  />
                </div>
              </Link>
              <p className="text-xs text-gray-400 uppercase mb-1">
                {product.category}
              </p>
              <h3 className="text-md font-semibold mb-1 line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-auto gap-2">
                <p className="text-green-600 font-bold">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 active:scale-95 transition-all text-sm"
                >
                  + Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
