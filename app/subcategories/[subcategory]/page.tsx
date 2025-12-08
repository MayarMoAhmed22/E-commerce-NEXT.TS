import { CategoryI } from "@/interfaces";
import SubcategoryDetails from "./SubcategoryDetials";
import { Params } from "next/dist/server/request/params";

export default async function SubCategoryItems({ params }: { params: Params }) {
  const { subcategory } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${subcategory}`
  );

  const json = await response.json();
  const data: CategoryI = json.data;

  if (!data) {
    return <p className=" text-center text-3xl">NO SubCategories ARE FOUND</p>;
  }

  return <SubcategoryDetails product={data} />;
}
