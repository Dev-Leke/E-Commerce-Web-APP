import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import ShopCategories from "@/components/home/ShopCategories";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <ShopCategories />
        <FeaturedProducts />
      </main>
    </div>
  );
}
