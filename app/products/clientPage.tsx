"use client";
import { useState } from "react";
import { productDataa } from "../../interfaces/products";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import Link from "next/link";
import AddToCart from "../_Components/AddtoCart/AddToCart";
import AddToWishList from "../_Components/addtowishlist/AddToWishList";

interface ProductsProps {
  products: productDataa[];
}

export default function ProductsClient({ products }: ProductsProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  if (!products) return null;

  const showMore = () =>
    setVisibleCount((prev) => Math.min(prev + 5, products.length));
  const showLess = () => setVisibleCount((prev) => Math.max(prev - 5, 5));

  return (
    <>
      <div className="flex items-center gap-2 py-5">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <h3 className="text-xl font-semibold text-[#DB4444]">Our Products</h3>
      </div>

      <h1 className="font-inter font-semibold text-4xl tracking-[4%]">
        Explore Our Products
      </h1>

      <div className="grid lg:grid-cols-5 sm:grid-cols-2 md:col-end-4 sm:gap-1  gap-3 py-4">
        {products.slice(0, visibleCount).map((product) => (
          <Card key={product.id} className="w-full max-w-sm">
            <Link href={"/products/" + product.id}>
              {" "}
              <CardHeader>
                <Image
                  src={product.imageCover}
                  width={300}
                  height={400}
                  alt={product.title}
                />
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>
                  Price:{" "}
                  <span className="font-bold text"> ${product.price}</span>
                </CardDescription>
              </CardHeader>
            </Link>
            <CardFooter className=" flex justify-center items-center">
              <AddToCart productId={product.id} />
              <AddToWishList productId={product.id} />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-4 py-4">
        {visibleCount < products.length && (
          <button
            className="bg-[#DB4444] text-white px-6 py-2 rounded"
            onClick={showMore}
          >
            More Products
          </button>
        )}
        {visibleCount > 5 && (
          <button
            className="bg-[#DB4444] text-white px-6 py-2 rounded"
            onClick={showLess}
          >
            Less Products
          </button>
        )}
      </div>
    </>
  );
}
