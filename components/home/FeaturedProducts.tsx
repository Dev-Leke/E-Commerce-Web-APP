"use client";

import ProductCard from "../products/ProductCard";
import { useCart } from "@/context/CartContext";

const products = [
  { id: "1", name: "Fresh Apples", price: 4.99, image: "/images/fresh-apples.jpg" },
  { id: "2", name: "Bananas", price: 2.99, image: "/images/bananas.jpg" },
  { id: "3", name: "Milk", price: 3.49, image: "/images/bottle-of-milk.jpg" },
  { id: "4", name: "Bread", price: 2.49, image: "/images/bread.jpg" },
];

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl text-center font-bold mb-8">Featured Products</h2>
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