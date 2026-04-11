"use client";

import CategoryCard from "./CategoryCard";

const categories = [
  { title: "Fruits", image: "/images/fruitsCategory.jpg" },
  { title: "Vegetables", image: "/images/vegetableCategory.jpg" },
  { title: "Dairy", image: "/images/dairy.jpg" },
  { title: "Meat", image: "/images/meatCategory.jpg" },
  { title: "Bakery", image: "/images/bakeryCategory.jpg" },
];

const ShopCategories = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>

        <div className="flex justify-center gap-6 flex-wrap">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              image={cat.image}
              onClick={() => alert(`Clicked ${cat.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;
