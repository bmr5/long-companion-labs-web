"use client";

import { useAuth } from "lib/auth/context";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, User, LogOut, ChevronRight, ShoppingBag } from "lucide-react";
import type { WooOrder } from "lib/woocommerce/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatPrice(amount: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount));
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "on-hold":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
    case "failed":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-orange-100 text-orange-800";
    case "refunded":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-stone-100 text-stone-800";
  }
}

function getStatusLabel(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<WooOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        } else {
          setError("Failed to load orders");
        }
      } catch {
        setError("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-stone-900">My Account</h1>
        <p className="mt-2 text-stone-600">
          Welcome back, {user?.firstName || user?.displayName || "Researcher"}
        </p>
      </div>

      {/* User Info Card */}
      <div className="mb-8 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <div className="border-b border-stone-100 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C4A484]/10">
              <User className="h-7 w-7 text-[#C4A484]" />
            </div>
            <div>
              <h2 className="font-medium text-stone-900">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.displayName || "User"}
              </h2>
              <p className="text-sm text-stone-500">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-stone-50"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-stone-400" />
              <span className="text-sm font-medium text-stone-700">Sign Out</span>
            </div>
            <ChevronRight className="h-4 w-4 text-stone-400" />
          </button>
        </div>
      </div>

      {/* Order History */}
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
        <div className="border-b border-stone-100 p-6">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-stone-400" />
            <h2 className="text-lg font-medium text-stone-900">Order History</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-[#C4A484]" />
              <p className="mt-4 text-sm text-stone-500">Loading orders...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-stone-500">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-stone-300" />
            <h3 className="mt-4 text-lg font-medium text-stone-900">No orders yet</h3>
            <p className="mt-2 text-sm text-stone-500">
              When you place orders, they will appear here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-[#C4A484] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B8997A]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-stone-900">
                        Order #{order.id}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-500">
                      {formatDate(order.date_created)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-stone-900">
                      {formatPrice(order.total)}
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      {order.line_items.length}{" "}
                      {order.line_items.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-4 rounded-lg bg-stone-50 p-4">
                  <ul className="space-y-2">
                    {order.line_items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-stone-700">
                          {item.name}{" "}
                          <span className="text-stone-400">x{item.quantity}</span>
                        </span>
                        <span className="text-stone-600">
                          {formatPrice(item.total)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment button for pending orders */}
                {order.status === "pending" && order.payment_url && (
                  <div className="mt-4">
                    <a
                      href={order.payment_url}
                      className="inline-block rounded-full bg-[#C4A484] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B8997A]"
                    >
                      Complete Payment
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
