"use client";

import { CartResponse } from "@/interfaces/getcart";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setcartData: (data: CartResponse | null) => void;
  getCart: () => void;
  isloading: boolean;
  setLoading: (value: boolean) => void;
}>({
  cartData: null,
  setcartData: () => {},
  getCart: () => {},
  isloading: false,
  setLoading: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setcartData] = useState<CartResponse | null>(null);
  const [isloading, setLoading] = useState<boolean>(false);

  async function getCart() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "GET",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzA3Yzk0ODRkOTUwYzkwMjQzMDVhZSIsIm5hbWUiOiJtYXlhciBtb2hhbWVkIGFobWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ3ODUzMDEsImV4cCI6MTc3MjU2MTMwMX0.8FVHCtVCf6PdJEe23Llvs-_sRpzDYrcLeMAK9xNtd-Y",
          },
        }
      );
      const data: CartResponse = await response.json();

      setcartData(data);
      if (cartData?.data.cartOwner) {
        localStorage.setItem("userId", cartData?.data.cartOwner);
      }
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <CartContext.Provider
      value={{ cartData, setcartData, isloading, setLoading, getCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
