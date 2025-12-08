import { CategoryI } from "@/interfaces";
import React from "react";
import Brands from "./brand";

export default async function Brand() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data }: { data: CategoryI[] } = await res.json();

  return (
    <div>
      <Brands products={data} />
    </div>
  );
}
