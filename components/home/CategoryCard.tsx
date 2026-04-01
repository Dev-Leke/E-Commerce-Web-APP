"use client";

import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const CategoryCard = ({ title, image, onClick }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center 
           w-[30%] sm:w-[18%] md:w-[16%] 
           min-w-[120px]
           h-36 p-3 
           rounded-lg shadow-md 
           cursor-pointer 
           hover:scale-105 transition-transform duration-200"
    >
      <Image
        src={image}
        alt={title}
        width={300}
        height={200}
        style={{ width: "auto", height: "auto" }}
        className="rounded-lg"
      />
      <h3 className="text-sm font-medium text-center mt-2">{title}</h3>
    </div>
  );
};

export default CategoryCard;
