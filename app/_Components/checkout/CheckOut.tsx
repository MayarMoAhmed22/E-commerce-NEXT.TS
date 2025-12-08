"use client";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import CashCheckOut from "../cashCheckOut/CashCheckOut";

export default function CheckOut({ cartId }: { cartId?: string }) {
  const detialsInput = useRef<HTMLInputElement | null>(null);
  const PhoneInput = useRef<HTMLInputElement | null>(null);
  const CityInput = useRef<HTMLInputElement | null>(null);
  async function checkOut() {
    const shippingAddress = {
      detials: detialsInput.current?.value,
      city: CityInput.current?.value,
      phone: PhoneInput.current?.value,
    };
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzA3Yzk0ODRkOTUwYzkwMjQzMDVhZSIsIm5hbWUiOiJtYXlhciBtb2hhbWVkIGFobWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ3ODUzMDEsImV4cCI6MTc3MjU2MTMwMX0.8FVHCtVCf6PdJEe23Llvs-_sRpzDYrcLeMAK9xNtd-Y",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status == "success") {
      location.href = data.session.url;
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-[#DB4444] text-white px-6 py-2 rounded mt-4">
            Proceed to Checkout
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Billing Details</AlertDialogTitle>
            <AlertDialogDescription>
              <div className=" flex flex-col gap-4">
                <Input
                  ref={detialsInput}
                  type="text"
                  placeholder="Detials about you"
                />
                <Input
                  ref={PhoneInput}
                  type="text"
                  placeholder="phone Number"
                />
                <Input ref={CityInput} type="text" placeholder="City" />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Button onClick={checkOut}> Visa</Button>
            </AlertDialogAction>
            <CashCheckOut cartId={cartId} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
