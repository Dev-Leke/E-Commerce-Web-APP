import { promises } from "dns";
import Image from "next/image";

const products = [
  {
    id: "1",
    name: "Fresh Apples",
    price: 4.99,
    image: "/images/fresh-apples.jpg",
    description: "Crisp and fresh apples مباشرة from the farm.",
  },
  {
    id: "2",
    name: "Bananas",
    price: 2.99,
    image: "/images/bananas.jpg",
    description: "Sweet and ripe bananas full of nutrients.",
  },
  {
    id: "3",
    name: "Milk",
    price: 3.49,
    image: "/images/bottle-of-milk.jpg",
    description: "Fresh dairy milk غني بالكالسيوم.",
  },
  {
    id: "4",
    name: "Bread",
    price: 2.49,
    image: "/images/bread.jpg",
    description: "Soft and freshly baked bread.",
  },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-80">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-green-600 text-xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
