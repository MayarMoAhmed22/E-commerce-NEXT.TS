"use client";

import CheckOut from "@/app/_Components/checkout/CheckOut";
import { WishListContext } from "@/app/_Components/context/WishListContext";
import Loading from "@/app/loading";
import { CartResponse } from "@/interfaces";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  title: string;
  price: number;
  quantity?: number;
  count?: number;
  imageCover: string;
}

interface WishlistData {
  status: string;
  count: number;
  data: Product[];
  cartId?: string;
}

export default function WishListDetails() {
  const { wishlistData, isloading, setwishlistData } =
    useContext(WishListContext);
  const [removeId, setRemoveId] = useState<string | null>(null);

  // Map products safely
  const products: Product[] = wishlistData?.data || [];

  // Calculate subtotal
  const subtotal = products.reduce(
    (sum, product) =>
      sum + product.price * (product.quantity ?? product.count ?? 0),
    0
  );

  // Remove item
  const removeItem = async (productId: string) => {
    setRemoveId(productId);
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzA3Yzk0ODRkOTUwYzkwMjQzMDVhZSIsIm5hbWUiOiJtYXlhciBtb2hhbWVkIGFobWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ3ODUzMDEsImV4cCI6MTc3MjU2MTMwMX0.8FVHCtVCf6PdJEe23Llvs-_sRpzDYrcLeMAK9xNtd-Y",
          },
        }
      );

      const data: CartResponse = await response.json();

      if (data.status === "success") {
        toast.success("Deleted successfully");
        setwishlistData(data);
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      toast.error("Error removing item");
      console.error(error);
    } finally {
      setRemoveId(null);
    }
  };

  return (
    <>
      {isloading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="p-6 text-center text-gray-500 text-lg">
          NO ITEMS ADDED
        </div>
      ) : (
        <div className="flex flex-col justify-between py-4 w-full items-center gap-5">
          <div className="flex flex-col w-full max-w-4xl mx-auto gap-6">
            <div className="flex items-center p-4 shadow-sm font-semibold rounded-t-md">
              <div className="flex-1 flex items-center gap-3">Product</div>
              <div className="w-24 text-center">Price</div>
              <div className="w-24 text-center">Quantity</div>
              <div className="w-24 text-center">Subtotal</div>
            </div>

            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center p-4 border-b border-gray-200"
              >
                <div className="flex-1 flex items-center gap-3">
                  <Image
                    src={product.imageCover}
                    width={50}
                    height={50}
                    alt={product.title}
                    className="object-cover rounded-sm"
                  />
                  <span>{product.title}</span>
                </div>

                <div className="w-24 text-center">${product.price}</div>
                <div className="w-24 text-center">
                  {product.quantity ?? product.count ?? 0}
                </div>
                <div className="w-24 text-center">
                  ${product.price * (product.quantity ?? product.count ?? 0)}
                </div>

                <button
                  onClick={() => removeItem(product._id)}
                  disabled={removeId === product._id}
                  className="text-destructive hover:underline cursor-pointer"
                >
                  {removeId === product._id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "X"
                  )}
                </button>
              </div>
            ))}
          </div>
          <CheckOut />
        </div>
      )}
    </>
  );
}
