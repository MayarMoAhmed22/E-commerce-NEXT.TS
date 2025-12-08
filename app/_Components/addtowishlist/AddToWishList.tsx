"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, ShoppingCartIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { WishListContext } from "../context/WishListContext";

export default function AddToWishList(productId: { productId: string }) {
  const [isloading, setLoading] = useState(false);
  const { getWichlist, setwishlistData } = useContext(WishListContext);
  async function AddProductToWishList() {
    setLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        body: JSON.stringify(productId),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzA3Yzk0ODRkOTUwYzkwMjQzMDVhZSIsIm5hbWUiOiJtYXlhciBtb2hhbWVkIGFobWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ3ODUzMDEsImV4cCI6MTc3MjU2MTMwMX0.8FVHCtVCf6PdJEe23Llvs-_sRpzDYrcLeMAK9xNtd-Y",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setwishlistData(data);
    setLoading(false);
    if (data.status == "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div>
      <Button
        onClick={AddProductToWishList}
        disabled={isloading}
        className="bg-[#DB4444] text-white mx-4 py-2 rounded text-center "
      >
        {isloading ? <Loader2 className=" animate-spin " /> : <Heart />}
      </Button>
    </div>
  );
}
