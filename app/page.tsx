import Brand from "./brands/page";
import Categories from "./categories/page";
import ProductsPage from "./products/page";
import SubCategories from "./subcategories/page";

export default function Home() {
  return (
    <div className="">
      <ProductsPage />
      <Categories />
      <Brand />
      <SubCategories />
    </div>
  );
}
