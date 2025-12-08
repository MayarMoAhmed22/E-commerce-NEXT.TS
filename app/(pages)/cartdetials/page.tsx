"use client";
import { CartContext } from "@/app/_Components/context/CartContext";
import Loading from "@/app/loading";
import { CartResponse } from "@/interfaces";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import CheckOut from "../../_Components/checkout/CheckOut";
import CashCheckOut from "@/app/_Components/cashCheckOut/CashCheckOut";

export default function CartDetails() {
  const { cartData, isloading, getCart, setcartData } = useContext(CartContext);
  const [removeId, setremoveId] = useState<string | null>(null);
  const [updateId, setupdatedId] = useState<string | null>(null);
  const [clearing, setClearing] = useState<boolean>(false);

  const products = cartData?.data?.products || [];

  const firstItem = products[0];
  if (firstItem && typeof firstItem.product === "string") {
    getCart();
  }

  // Calculate subtotal
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.count,
    0
  );

  async function removeItem(productId: string) {
    setremoveId(productId);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzA3Yzk0ODRkOTUwYzkwMjQzMDVhZSIsIm5hbWUiOiJtYXlhciBtb2hhbWVkIGFobWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ3ODUzMDEsImV4cCI6MTc3MjU2MTMwMX0.8FVHCtVCf6PdJEe23Llvs-_sRpzDYrcLeMAK9xNtd-Y",
        },
      }
    );
    const data: CartResponse = await response.json();
    if (data.status == "success") {
      toast.success("deleted successfully");
      setcartData(data);
    }
    setremoveId(null);
  }

  async function updateItem(productId: string, count: number) {
    if (count === 0) {
      removeItem(productId);
    } else {
      setupdatedId(productId);
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        {
          method: "PUT",
          body: JSON.stringify({ count }),
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzA3Yzk0ODRkOTUwYzkwMjQzMDVhZSIsIm5hbWUiOiJtYXlhciBtb2hhbWVkIGFobWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ3ODUzMDEsImV4cCI6MTc3MjU2MTMwMX0.8FVHCtVCf6PdJEe23Llvs-_sRpzDYrcLeMAK9xNtd-Y",
            "Content-Type": "application/json",
          },
        }
      );
      const data: CartResponse = await response.json();
      if (data.status === "success") {
        toast.success("done update");
        setcartData(data);
      }
      setupdatedId(null);
    }
  }

  async function clearItems() {
    setClearing(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzA3Yzk0ODRkOTUwYzkwMjQzMDVhZSIsIm5hbWUiOiJtYXlhciBtb2hhbWVkIGFobWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ3ODUzMDEsImV4cCI6MTc3MjU2MTMwMX0.8FVHCtVCf6PdJEe23Llvs-_sRpzDYrcLeMAK9xNtd-Y",
        },
      }
    );
    const data: CartResponse = await response.json();
    if (data.message === "success") {
      setcartData(data); // Make sure products is an empty array
    }
    setClearing(false);
  }

  return (
    <>
      {isloading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="p-6 text-center text-gray-500 text-lg">
          NO ITEMS ADDED
        </div>
      ) : (
        <div className="flex justify-between py-4 w-full items-start gap-5">
          <div className="flex flex-col w-full max-w-4xl mx-auto gap-6">
            <div className="flex items-center p-4 shadow-sm font-semibold rounded-t-md ">
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
                    src={product.product.imageCover}
                    width={50}
                    height={50}
                    alt={product.product.title}
                    className="object-cover rounded-sm"
                  />
                  <span>{product.product.title}</span>
                </div>

                <div className="w-24 text-center">${product.price}</div>

                <div className="w-24 text-center flex justify-center gap-2">
                  <button
                    onClick={() =>
                      updateItem(product.product._id, product.count - 1)
                    }
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="p-2">{product.count}</span>

                  <button
                    onClick={() =>
                      updateItem(product.product._id, product.count + 1)
                    }
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="w-24 text-center">
                  ${product.price * product.count}
                </div>

                <button
                  onClick={() => removeItem(product.product._id)}
                  disabled={removeId === product.product._id}
                  className="text-destructive hover:underline cursor-pointer"
                >
                  {removeId === product.product._id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "X"
                  )}
                </button>
              </div>
            ))}
          </div>
          <div className=" flex flex-col w-full justify-center items-center">
            <div className="border border-black p-6 rounded-md w-full flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Cart Total</h2>
              <div className="flex justify-between items-center">
                <h3>Subtotal:</h3>
                <p>${subtotal}</p>
              </div>
              <div className="flex justify-between items-center">
                <h3>Shipping:</h3>
                <p className="text-green-500">Free</p>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg">
                <h3>Total:</h3>
                <p>${subtotal}</p>
              </div>

              <CheckOut cartId={cartData?.cartId} />
            </div>
            <button
              onClick={clearItems}
              className="bg-[#DB4444] text-white px-4 py-3 rounded mt-4 flex items-center w-[50%] justify-center"
            >
              <Trash2 /> <span>Clear Cart</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
