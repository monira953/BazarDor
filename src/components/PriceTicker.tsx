"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { Product } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();
        let productList: Product[] = [];

        if (Array.isArray(result)) {
          productList = result as Product[];
        } else if (result && typeof result === "object") {
          const resObj = result as Record<string, unknown>;
          if (Array.isArray(resObj.data)) {
            productList = resObj.data as Product[];
          } else if (Array.isArray(resObj.products)) {
            productList = resObj.products as Product[];
          }
        }

        if (!cancelled) {
          setProducts(productList);
        }
      } catch (error) {
        console.error("Price ticker loading error:", error);
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (products.length === 0) {
    return null;
  }

  const tickerProducts = [...products, ...products];

  return (
    <section
      className="overflow-hidden border-b border-base-300 bg-white"
      aria-label="পণ্যের দামের পরিবর্তন"
    >
      <div className="mx-auto flex max-w-7xl items-center">
        <div className="z-10 flex shrink-0 items-center gap-2 bg-green-800 px-3 py-3 text-xs font-semibold text-white sm:px-4 sm:text-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-300" />
          <span>বাজার আপডেট</span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="animate-marquee flex w-max items-center">
            {tickerProducts.map((product, index) => {
              const direction = product.change?.dir;
              const percentage = product.change?.pct ?? 0;

              const isUp = direction === "up";
              const isDown = direction === "down";
              const isFlat = direction === "flat";

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex shrink-0 items-center gap-2 px-4 py-3 text-sm"
                >
                  <span aria-hidden="true">{product.categoryIcon || "🛒"}</span>

                  <span className="whitespace-nowrap font-medium text-base-content">
                    {product.nameBn}
                  </span>

                  <span className="whitespace-nowrap font-semibold text-green-800">
                    {formatPrice(product.today)} টাকা
                  </span>

                  <span
                    className={`flex items-center gap-1 whitespace-nowrap text-xs font-semibold ${
                      isUp
                        ? "text-red-600"
                        : isDown
                        ? "text-green-700"
                        : "text-gray-500"
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp size={14} />
                    ) : isDown ? (
                      <TrendingDown size={14} />
                    ) : (
                      <Minus size={14} />
                    )}

                    {isFlat
                      ? "পরিবর্তন নেই"
                      : `${isUp ? "+" : isDown ? "-" : ""}${formatPrice(
                          Math.abs(percentage),
                        )}%`}
                  </span>

                  <span className="ml-2 text-base-300" aria-hidden="true">
                    •
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}