"use client";

import { useRouter } from "next/navigation";
import CategoryCard from "./CategoryCard";

const categories = [
  { title: "Fruits", emoji: "🍎", image: "/images/fruitsCategory.jpg" },
  { title: "Vegetables", emoji: "🥦", image: "/images/vegetableCategory.jpg" },
  { title: "Dairy", emoji: "🥛", image: "/images/dairy.jpg" },
  { title: "Meat", emoji: "🥩", image: "/images/meatCategory.jpg" },
  { title: "Bakery", emoji: "🍞", image: "/images/bakeryCategory.jpg" },
];

const ShopCategories = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              emoji={cat.emoji}
              image={cat.image}
              onClick={() => router.push(`/shop?category=${cat.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;
