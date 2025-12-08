import { CategoryI } from "@/interfaces";
import React from "react";
import ClientCategories from "./ClientCategories";

export default async function Categories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  const { data }: { data: CategoryI[] } = await res.json();

  return (
    <div>
      <ClientCategories products={data} />
    </div>
  );
}
