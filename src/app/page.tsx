
import { getProducts } from "@/lib/api";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0),
    )
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0),
    )
    .slice(0, 6);

  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <section className="mt-10" aria-labelledby="risers-heading">
          <div className="mb-5">
            <h2
              id="risers-heading"
              className="text-2xl font-bold text-base-content"
            >
              আজ দাম বেড়েছে <span className="text-red-600">▲</span>
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              যেসব পণ্যের দাম আজ বেড়েছে
            </p>
          </div>

          {risers.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {risers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-base-200 p-5 text-sm text-base-content/70">
              এই মুহূর্তে দাম বৃদ্ধির তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

        <section className="mt-12" aria-labelledby="fallers-heading">
          <div className="mb-5">
            <h2
              id="fallers-heading"
              className="text-2xl font-bold text-base-content"
            >
              আজ দাম কমেছে <span className="text-green-600">▼</span>
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              যেসব পণ্যের দাম আজ কমেছে
            </p>
          </div>

          {fallers.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {fallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-base-200 p-5 text-sm text-base-content/70">
              এই মুহূর্তে দাম কমার তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

        <section
          id="সব-পণ্য"
          className="mt-12 scroll-mt-36"
          aria-labelledby="all-products-heading"
        >
          <div className="mb-5">
            <h2
              id="all-products-heading"
              className="text-2xl font-bold text-base-content"
            >
              সব পণ্য
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-base-200 p-5 text-sm text-base-content/70">
              কোনো পণ্যের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}