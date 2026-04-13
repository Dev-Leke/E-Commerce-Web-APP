"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";

const ProductCard = ({
  id,
  name,
  price,
  image,
  onAddToCart,
}: ProductCardProps) => {
  const [src, setSrc] = useState(image);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300 flex flex-col group">
      <Link href={`/product/${id}`}>
        <div className="w-full h-40 relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            loading="eager" // ✅ already there, make sure it's on ProductCard
            onError={() => setSrc(FALLBACK)}
          />
        </div>
      </Link>

      <h3 className="text-md font-semibold mb-2 line-clamp-2 min-h-[2.5rem]">
        {name}
      </h3>

      <div className="flex items-center justify-between mt-auto gap-2">
        <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
        <button
          onClick={onAddToCart}
          className="bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 active:scale-95 transition-all text-sm"
        >
          + Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
