import ProductsClient from "./clientPage";
import { productDataa } from "../../interfaces/products";

export default async function ProductsPage() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  const { data }: { data: productDataa[] } = await res.json();

  return <ProductsClient products={data} />;
}
