import { CategoryI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import CategoriesDetials from "./CategoriesDetials";

export default async function CategoryDetials({ params }: { params: Params }) {
  const { categoryId } = await params;
  console.log("categoryId:", categoryId);

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  const { data }: { data: CategoryI } = await response.json();
  console.log("category data:", data);

  if (!data) {
    return <p>Category not found</p>;
  }

  return <CategoriesDetials product={data} />;
}
