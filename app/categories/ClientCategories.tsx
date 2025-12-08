import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface CategoriesProps {
  products: CategoryI[];
}

export default function ClientCategories({ products }: CategoriesProps) {
  return (
    <>
      <div className="flex items-center gap-2 py-5">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <h3 className="text-xl font-semibold text-[#DB4444]">Categories</h3>
      </div>

      <h1 className="font-inter font-semibold text-4xl tracking-[4%]">
        Browse By Category
      </h1>

      <div className="grid lg:grid-cols-5 sm:grid-cols-2 gap-3 py-4">
        {products.map((product) => (
          <Card key={product._id} className="w-[90%] max-w-sm">
            <Link href={`/categories/${product._id}`}>
              <CardHeader className=" flex justify-center items-center gap-5 flex-col">
                <div className="w-20 h-20 flex items-center justify-center gap-5">
                  <Image
                    src={product.image}
                    width={70}
                    height={70}
                    className=" mx-auto object-contain"
                    alt={product.name}
                  />
                </div>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
