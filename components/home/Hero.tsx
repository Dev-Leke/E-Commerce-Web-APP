import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[500px] w-full flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/fruit1bg.jpg"
          alt="Groceries"
          fill
          sizes="100vw"
          className="object-cover"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="text-white max-w-xl">
          <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
            🚚 Free delivery over $50
          </span>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Fresh Groceries <br /> Delivered Fast
          </h1>
          <p className="text-gray-200 text-lg mb-8">
            Get your daily essentials delivered to your doorstep in minutes.
            Fresh produce, dairy, meat and more.
          </p>
          <div className="flex gap-4">
            <Link
              href="/shop"
              className="bg-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 active:scale-95 transition"
            >
              Shop Now
            </Link>
            <Link
              href="/shop"
              className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              View Deals
            </Link>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-gray-300 text-sm">Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-gray-300 text-sm">Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold">30min</p>
              <p className="text-gray-300 text-sm">Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
