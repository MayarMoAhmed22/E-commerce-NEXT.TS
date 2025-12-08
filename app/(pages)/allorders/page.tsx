"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AllOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getAllOrders() {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" +
        localStorage.getItem("userId")
    );
    const data = await response.json();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div key={order._id} className="border rounded-md p-4 shadow-sm">
          <div className="flex justify-between mb-3">
            <span className="font-semibold">Order ID: {order._id}</span>
            <span className="text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p>
            <strong>Total:</strong> ${order.totalOrderPrice}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentMethodType}
          </p>

          <div className="mt-4 space-y-2">
            {order.cartItems.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-t pt-2"
              >
                <Image
                  src={item.product.imageCover}
                  width={200}
                  height={200}
                  alt={item.product.title}
                  className="w-14 h-14 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.count}</p>
                </div>

                <span className="font-semibold">${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
