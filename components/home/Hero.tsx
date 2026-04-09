import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[400px] w-full flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/fruit1bg.jpg"
          alt="Groceries"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          loading="eager"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Wrapper (80% / centered) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="text-white max-w-lg">
          <h1 className="text-4xl font-bold mb-4">
            Fresh Groceries Delivered Fast
          </h1>

          <p className="mb-6">
            Get your daily essentials delivered to your doorstep in minutes.
          </p>

          <button className="bg-green-500 px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
