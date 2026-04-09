"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
}

<<<<<<< Updated upstream
const ProductCard = ({
  id,
  name,
  price,
  image,
  onAddToCart,
}: ProductCardProps) => {
=======
const ProductCard = ({id, name, price, image, onAddToCart }: ProductCardProps) => {
>>>>>>> Stashed changes
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300 flex flex-col">
      {/* Product Image */}
      <Link href={`/product/${id}`}>
        <div className="w-full h-40 relative mb-4">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover rounded-lg"
            loading="eager"
          />
        </div>
      </Link>

      {/* Product Info */}
      <h3 className="text-md font-semibold mb-2">{name}</h3>

      {/* Price + Button */}
      <div className="flex items-center justify-between mt-auto gap-2">
        <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
        <button
          onClick={onAddToCart}
          className="bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 transition text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
