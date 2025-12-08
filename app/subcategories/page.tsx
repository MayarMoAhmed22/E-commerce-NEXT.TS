"use client";

import { CategoryI } from "@/interfaces";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SubCategories() {
  const [data, setData] = useState<CategoryI[]>([]);

  async function getAllSubcategories() {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories"
    );
    const json = await res.json();
    setData(json.data);
  }

  useEffect(() => {
    getAllSubcategories();
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 py-5">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <h3 className="text-xl font-semibold text-[#DB4444]">SubCategories</h3>
      </div>

      <h1 className="font-inter font-semibold text-4xl tracking-[4%]">
        SubCategories
      </h1>

      <div className="grid lg:grid-cols-5 sm:grid-cols-2 gap-3 py-4">
        {data.map((product) => (
          <Card key={product._id} className="w-[90%] max-w-sm">
            <Link href={`/subcategories/${product._id}`}>
              <CardHeader className="flex justify-center items-center ">
                <CardTitle className=" w-full text-center">
                  {product.name}
                </CardTitle>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
