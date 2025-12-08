"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Heart, ShoppingCartIcon } from "lucide-react";
import { WishListContext } from "./../context/WishListContext";

export default function Navbar() {
  const { cartData } = useContext(CartContext);
  const { wishlistData } = useContext(WishListContext);
  const pathname = usePathname();

  return (
    <div className="border-b-2 sticky top-0 z-50 bg-white">
      <div className="container py-3 flex justify-between items-center mx-auto">
        <h1 className="bold text-4xl">
          <Link href={"/"}>Exclusive</Link>
        </h1>
        <ul className="flex gap-4">
          <li className="text-2xl">
            <Link href={"/"} className={pathname == "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li className="text-2xl">
            <Link
              href={"/contact"}
              className={pathname == "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
          <li className="text-2xl">
            <Link
              href={"/about"}
              className={pathname == "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li className="text-2xl">
            <Link
              href={"/signup"}
              className={pathname == "/signup" ? "active" : ""}
            >
              SignUp
            </Link>
          </li>
        </ul>
        <ul className="flex gap-3 items-center">
          <li>
            <div className="p-3 relative">
              <Link href={"/cartdetials"}>
                <ShoppingCartIcon />
              </Link>
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartData?.numOfCartItems || 0}
              </span>
            </div>
          </li>
          <li>
            <div className="p-3 relative">
              <Link href={"/wishlistdetials"}>
                <Heart />
              </Link>
            </div>
          </li>
          <li>
            <i className="fa-solid fa-xl fa-user"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}
