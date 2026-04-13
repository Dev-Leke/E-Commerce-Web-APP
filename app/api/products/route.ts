import { NextResponse } from "next/server";
import itemsData from "@/app/product/[id]/productList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const products = itemsData.map((p) => ({
    id: String(p.id),
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category,
    description: p.description,
  }));

  const filtered =
    category && category !== "All"
      ? products.filter((p) => p.category === category)
      : products;

  return NextResponse.json(filtered);
}
