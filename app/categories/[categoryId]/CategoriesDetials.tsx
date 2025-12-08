"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddToCart from "@/app/_Components/AddtoCart/AddToCart";
import { CategoryI } from "../../../interfaces/CategoryI";
import AddToWishList from "@/app/_Components/addtowishlist/AddToWishList";

interface CategoryIProps {
  product: CategoryI;
}

export default function CategoriesDetials({ product }: CategoryIProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
      {/* Product Image */}
      <div className="flex-1 border rounded-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-bold text-3xl">{product.name}</CardTitle>
        </CardHeader>

        <div className="mx-auto flex justify-center items-center w-[80%]">
          <AddToCart productId={product._id} />
          <AddToWishList productId={product._id} />
        </div>
      </Card>
    </div>
  );
}
