import Image from "next/image";

const categories = [
  { name: "Fruits", image: "/categories/fruits.jpg" },
  { name: "Vegetables", image: "/categories/vegetables.jpg" },
  { name: "Dairy", image: "/categories/dairy.jpg" },
  { name: "Bakery", image: "/categories/bakery.jpg" },
];

const products = [
  {
    name: "Fresh Apples",
    price: "$4.99",
    image: "/products/apples.jpg",
  },
  {
    name: "Milk 2L",
    price: "$3.49",
    image: "/products/milk.jpg",
  },
  {
    name: "Whole Wheat Bread",
    price: "$2.99",
    image: "/products/bread.jpg",
  },
  {
    name: "Carrots",
    price: "$1.99",
    image: "/products/carrots.jpg",
  },
];

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">FreshMart 🛒</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:text-green-600">Home</a>
          <a href="#" className="hover:text-green-600">Shop</a>
          <a href="#" className="hover:text-green-600">Cart</a>
          <a href="#" className="hover:text-green-600">Account</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-green-100 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Fresh Groceries Delivered to Your Door 🚚
        </h2>
        <p className="text-lg mb-6">
          Shop fresh produce, dairy, and everyday essentials.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <h3 className="text-2xl font-semibold mb-6">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg p-4 text-center">
              <div className="h-32 w-full relative mb-4">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h4 className="font-medium">{cat.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6 bg-white">
        <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="border rounded-xl p-4 hover:shadow-lg">
              <div className="h-32 w-full relative mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-green-600 font-semibold">{product.price}</p>
              <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>© 2026 FreshMart. All rights reserved.</p>
      </footer>
    </div>
  );
}