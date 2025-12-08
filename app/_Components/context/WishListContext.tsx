"use client";

import { CartResponse } from "@/interfaces/getcart";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishListContext = createContext<{
  wishlistData: CartResponse | null;
  setwishlistData: (data: CartResponse | null) => void;
  getWichlist: () => void;
  isloading: boolean;
  setLoading: (value: boolean) => void;
}>({
  wishlistData: null,
  setwishlistData: () => {},
  getWichlist: () => {},
  isloading: false,
  setLoading: () => {},
});

export default function WishListContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlistData, setwishlistData] = useState<CartResponse | null>(null);
  const [isloading, setLoading] = useState<boolean>(false);

  async function getWichlist() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: "GET",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzA3Yzk0ODRkOTUwYzkwMjQzMDVhZSIsIm5hbWUiOiJtYXlhciBtb2hhbWVkIGFobWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ3ODUzMDEsImV4cCI6MTc3MjU2MTMwMX0.8FVHCtVCf6PdJEe23Llvs-_sRpzDYrcLeMAK9xNtd-Y",
          },
        }
      );
      const data: CartResponse = await response.json();

      setwishlistData(data);
      if (wishlistData?.data.cartOwner) {
        localStorage.setItem("userId", wishlistData?.data.cartOwner);
      }
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  useEffect(() => {
    getWichlist();
  }, []);
  return (
    <WishListContext.Provider
      value={{
        wishlistData,
        setwishlistData,
        isloading,
        setLoading,
        getWichlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
