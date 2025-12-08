import { productDataa } from "@/interfaces";
import ClientProductDetialspage from "./clientProductDetialspage";
import { Params } from "next/dist/server/request/params";

export default async function ProductDetials({ params }: { params: Params }) {
  const { productId } = await params;
  console.log(productId);

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId
  );

  const { data }: { data: productDataa } = await response.json();

  return <ClientProductDetialspage product={data} />;
}
