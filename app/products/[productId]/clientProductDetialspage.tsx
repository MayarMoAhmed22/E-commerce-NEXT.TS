"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { productDataa } from "@/interfaces";
import AddToCart from "@/app/_Components/AddtoCart/AddToCart";
import AddToWishList from "@/app/_Components/addtowishlist/AddToWishList";

interface ProductsProps {
  product: productDataa;
}

export default function ClientProductDetialspage({ product }: ProductsProps) {
  const [mainImage, setMainImage] = useState(product.images?.[0] || "");

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
      {/* Image Gallery */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4">
          {product.images?.slice(0, 3).map((img, idx) => (
            <button
              key={idx} // use index, not product id
              onClick={() => setMainImage(img)}
              className="border rounded-md overflow-hidden hover:ring-2 hover:ring-blue-500"
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="flex-1 border rounded-md overflow-hidden">
          {mainImage && (
            <Image
              src={mainImage}
              alt={product.title}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-bold text-3xl">{product.title}</CardTitle>
          <p className=" text-[#000000] opacity-50 text-sm">
            {product.category.slug}
          </p>
          <span className="text-sm ">{product.brand.name}</span>
          <CardDescription className="text-lg font-semibold text-green-600">
            ${product.price.toFixed(2)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-2xl">{product.description}</p>
        </CardContent>
        <div className="mx-auto w-[80%]">
          <AddToCart productId={product.id} />
          <AddToWishList productId={product.id} />
        </div>
      </Card>
    </div>
  );
}
