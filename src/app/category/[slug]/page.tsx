
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchApi, getProductsByCategory } from "@/lib/api";
import type { Category, Product } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";

function parseCategory(response: unknown): Category | null {
  if (typeof response !== "object" || response === null) {
    return null;
  }

  const result = response as Record<string, unknown>;
  const candidate =
    result.data && typeof result.data === "object"
      ? (result.data as Record<string, unknown>)
      : result.category && typeof result.category === "object"
        ? (result.category as Record<string, unknown>)
        : result;

  if (
    typeof candidate.slug === "string" &&
    typeof candidate.nameBn === "string"
  ) {
    return candidate as unknown as Category;
  }

  return null;
}

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCategory() {
      setLoading(true);
      setError(false);
      setCategory(null);
      setProducts([]);
      setSortBy("default");

      try {
        const [productResult, categoryResult] = await Promise.all([
          getProductsByCategory(slug),
          fetchApi<unknown>(
            `/categories/${encodeURIComponent(slug)}`,
          ),
        ]);

        if (cancelled) return;

        setProducts(productResult);
        setCategory(parseCategory(categoryResult));
      } catch (err) {
        console.error("Failed to load category:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      void loadCategory();
    }

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.today - b.today;
      }

      if (sortBy === "price-desc") {
        return b.today - a.today;
      }

      return 0;
    });
  }, [products, sortBy]);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-base-300" />
        <div className="mb-8 h-5 w-64 animate-pulse rounded bg-base-200" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-2xl border border-base-300 bg-base-200"
            />
          ))}
        </div>
      </main>
    );
  }

  if (error || !category || products.length === 0) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-base-content">
          কোনো পণ্য পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm text-base-content/60">
          এই ক্যাটাগরিতে পণ্যের তথ্য পাওয়া যাচ্ছে না।
        </p>

        <Link
          href="/"
          className="btn mt-6 rounded-xl bg-green-800 text-white hover:bg-green-900"
        >
          <ArrowLeft size={18} />
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-base-content/60">
        <Link href="/" className="transition-colors hover:text-green-800">
          হোম
        </Link>
        <span className="mx-2">/</span>
        <span className="text-base-content">{category.nameBn}</span>
      </nav>

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">
              {category.icon}
            </span>

            <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
              {category.nameBn}
            </h1>
          </div>

          <p className="mt-2 text-sm text-base-content/60">
            এই ক্যাটাগরির মোট {products.length}টি পণ্য
          </p>
        </div>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}