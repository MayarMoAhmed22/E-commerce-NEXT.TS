"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { log } from "console";

export default function CashCheckOut({ cartId }: { cartId?: string }) {
  const detialsInput = useRef<HTMLInputElement | null>(null);
  const PhoneInput = useRef<HTMLInputElement | null>(null);
  const CityInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  async function handleCashCheckOut() {
    const shippingAddress = {
      detials: detialsInput.current?.value,
      city: CityInput.current?.value,
      phone: PhoneInput.current?.value,
    };
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
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
    console.log(data);

    if (data.status === "success") {
      router.push("/allorders");
    }
  }
  return (
    <>
      <Button onClick={handleCashCheckOut}> Cash</Button>
    </>
  );
}
