"use client";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";

export default function AddToCart(productId: { productId: string }) {
  const [isloading, setLoading] = useState(false);
  const { getCart, setcartData } = useContext(CartContext);
  async function AddProductToCart() {
    setLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
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
    setcartData(data);
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
        onClick={AddProductToCart}
        disabled={isloading}
        className="bg-[#DB4444] text-white px-9 py-2 rounded text-center "
      >
        {isloading ? (
          <Loader2 className=" animate-spin " />
        ) : (
          <ShoppingCartIcon />
        )}
        Add to Cart
      </Button>
    </div>
  );
}
