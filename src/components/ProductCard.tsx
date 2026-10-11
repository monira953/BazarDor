import Link from "next/link";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { Product } from "@/lib/utils";
import { formatPrice, getUnitBn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const direction = product.change?.dir ?? "flat";
  const percentage = product.change?.pct ?? 0;

  const changeStyles = {
    up: {
      className: "badge-error",
      label: "দাম বেড়েছে",
      Icon: TrendingUp,
      sign: "+",
    },
    down: {
      className: "badge-success",
      label: "দাম কমেছে",
      Icon: TrendingDown,
      sign: "-",
    },
    flat: {
      className: "badge-ghost",
      label: "পরিবর্তন নেই",
      Icon: Minus,
      sign: "",
    },
  } as const;

  const change = changeStyles[direction];
  const ChangeIcon = change.Icon;

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <article className="flex h-full flex-col justify-between rounded-2xl border border-base-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-green-800/40 hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <span className={`badge ${change.className} gap-1 py-3 text-xs`}>
            <ChangeIcon size={13} />
            {change.sign}
            {formatPrice(Math.abs(percentage))}%
          </span>
        </div>

        <div className="my-4">
          <h3 className="text-lg font-bold text-base-content transition-colors group-hover:text-green-800">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-sm text-base-content/60">
            {getUnitBn(product.unit)}
          </p>
        </div>

        <div className="mt-auto border-t border-base-200 pt-3">
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="mt-1 text-xl font-bold text-green-800">
            {formatPrice(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
      </article>
    </Link>
  );
}