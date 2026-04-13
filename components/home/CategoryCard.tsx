"use client";

import Image from "next/image";
import { useState } from "react";

interface CategoryCardProps {
  title: string;
  emoji: string;
  image: string;
  onClick: () => void;
}

const CategoryCard = ({ title, emoji, image, onClick }: CategoryCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 group"
    >
      <div className="w-16 h-16 relative rounded-full overflow-hidden mb-3 bg-gray-100">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            {emoji}
          </div>
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            sizes="64px"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <h3 className="text-sm font-semibold text-center text-gray-700">
        {title}
      </h3>
    </div>
  );
};

export default CategoryCard;
