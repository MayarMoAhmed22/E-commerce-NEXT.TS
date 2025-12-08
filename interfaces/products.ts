import { CategoryI } from "./CategoryI";

export interface Root {
  data: productDataa[];
}

export interface productDataa {
  sold: number;
  images: string[];
  subcategory: [];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: CategoryI;
  brand: CategoryI;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
