
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, Minus } from "lucide-react";
import { getProductBySlug } from "@/lib/api";
import { formatPrice, getUnitBn } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const marketsByDivision = markets.reduce(
    (acc, market) => {
      if (!acc[market.division]) {
        acc[market.division] = [];
      }

      acc[market.division].push(market);
      return acc;
    },
    {} as Record<string, typeof markets>,
  );

  const allMins = markets.map((market) => market.min);
  const allMaxs = markets.map((market) => market.max);

  const minPrice = allMins.length > 0 ? Math.min(...allMins) : null;
  const maxPrice = allMaxs.length > 0 ? Math.max(...allMaxs) : null;

  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (sum, market) => sum + (market.min + market.max) / 2,
            0,
          ) / markets.length,
        )
      : null;

  const changeDirection = product.change?.dir ?? "flat";
  const changePercentage = product.change?.pct ?? 0;

  const changeStyle = {
    up: {
      label: "দাম বেড়েছে",
      className: "badge-error",
      Icon: ArrowUp,
      sign: "+",
    },
    down: {
      label: "দাম কমেছে",
      className: "badge-success",
      Icon: ArrowDown,
      sign: "-",
    },
    flat: {
      label: "দামের পরিবর্তন নেই",
      className: "badge-ghost",
      Icon: Minus,
      sign: "",
    },
  } as const;

  const change = changeStyle[changeDirection];
  const ChangeIcon = change.Icon;

  const priceStatistics = [
    {
      label: "সর্বনিম্ন দাম",
      value: minPrice,
      color: "text-green-700",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: maxPrice,
      color: "text-red-600",
    },
    {
      label: "গড় দাম",
      value: avgPrice,
      color: "text-blue-700",
    },
    {
      label: "আজকের দাম",
      value: product.today,
      color: "text-base-content",
    },
  ];

  const historicalPrices = [
    { label: "আজকের দাম", value: product.today },
    { label: "গতকালের দাম", value: product.yesterday },
    { label: "গত সপ্তাহের দাম", value: product.lastWeek },
    { label: "গত মাসের দাম", value: product.lastMonth },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="breadcrumbs mb-6 text-sm">
        <ul>
          <li>
            <Link href="/" className="hover:text-green-800">
              হোম
            </Link>
          </li>
          <li>
            <Link
              href={`/category/${product.category}`}
              className="hover:text-green-800"
            >
              {product.categoryNameBn}
            </Link>
          </li>
          <li>
            <span className="font-medium text-base-content">
              {product.nameBn}
            </span>
          </li>
        </ul>
      </div>

      {/* Product Summary */}
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-green-50 text-6xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="badge badge-outline">
                {product.categoryNameBn}
              </span>
              <span className="badge badge-outline">
                {getUnitBn(product.unit)}
              </span>
              <span className={`badge gap-1 ${change.className}`}>
                <ChangeIcon size={14} />
                {change.label}: {change.sign}
                {formatPrice(Math.abs(changePercentage))}%
              </span>
            </div>

            <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-sm text-base-content/60">
              আজকের বাজারদর
            </p>

            <p className="mt-1 text-3xl font-bold text-green-800">
              {formatPrice(product.today)}{" "}
              <span className="text-base font-medium">টাকা</span>
            </p>
          </div>
        </div>
      </section>

      {/* Price Statistics */}
      <section className="mt-10" aria-labelledby="statistics-heading">
        <h2
          id="statistics-heading"
          className="mb-5 text-xl font-bold text-base-content sm:text-2xl"
        >
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {priceStatistics.map((statistic) => (
            <article
              key={statistic.label}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <p className="text-sm text-base-content/60">
                {statistic.label}
              </p>

              <p className={`mt-3 text-xl font-bold ${statistic.color}`}>
                {statistic.value === null
                  ? "তথ্য নেই"
                  : `${formatPrice(statistic.value)} টাকা`}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Market-wise Prices */}
      <section className="mt-12" aria-labelledby="markets-heading">
        <div className="mb-5">
          <h2
            id="markets-heading"
            className="text-xl font-bold text-base-content sm:text-2xl"
          >
            বাজারভিত্তিক দাম
          </h2>
          <p className="mt-1 text-sm text-base-content/60">
            বিভাগ অনুযায়ী বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম
          </p>
        </div>

        {markets.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>বিভাগ</th>
                  <th>বাজার</th>
                  <th>সর্বনিম্ন দাম</th>
                  <th>সর্বোচ্চ দাম</th>
                </tr>
              </thead>

              {Object.entries(marketsByDivision).map(
                ([division, divisionMarkets]) => (
                  <tbody key={division}>
                    {divisionMarkets.map((market, index) => (
                      <tr key={`${division}-${market.market}-${index}`}>
                        {index === 0 && (
                          <td
                            rowSpan={divisionMarkets.length}
                            className="font-semibold"
                          >
                            {division}
                          </td>
                        )}
                        <td>{market.market}</td>
                        <td className="font-medium text-green-700">
                          {formatPrice(market.min)} টাকা
                        </td>
                        <td className="font-medium text-red-600">
                          {formatPrice(market.max)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ),
              )}
            </table>
          </div>
        ) : (
          <p className="rounded-xl bg-base-200 p-5 text-sm text-base-content/70">
            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Historical Price Comparison */}
      <section className="mt-12" aria-labelledby="history-heading">
        <h2
          id="history-heading"
          className="mb-5 text-xl font-bold text-base-content sm:text-2xl"
        >
          আগের দামের সঙ্গে তুলনা
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {historicalPrices.map((item, index) => (
            <article
              key={item.label}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <p className="text-sm text-base-content/60">{item.label}</p>
              <p className="mt-3 text-xl font-bold text-base-content">
                {formatPrice(item.value)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>

              {index > 0 && (
                <p className="mt-2 text-xs text-base-content/50">
                  আজকের দামের তুলনার জন্য
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Back Link */}
      <div className="mt-10">
        <Link
          href={`/category/${product.category}`}
          className="btn btn-outline rounded-xl"
        >
          <ArrowLeft size={17} />
          {product.categoryNameBn} ক্যাটাগরিতে ফিরে যান
        </Link>
      </div>
    </main>
  );
}