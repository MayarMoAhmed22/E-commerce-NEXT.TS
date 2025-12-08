"use client";

import { CategoryI } from "@/interfaces";
import Image from "next/image";

interface CategoriesProps {
  product: CategoryI;
}

export default function SubcategoryDetails({ product }: CategoriesProps) {
  console.log(product);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
    </div>
  );
}
