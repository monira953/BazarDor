export default function ProductLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <div className="skeleton h-4 w-16" />
        <div className="skeleton h-4 w-4" />
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-4 w-4" />
        <div className="skeleton h-4 w-32" />
      </div>

      {/* Product details */}
      <section className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Product image */}
        <div className="flex min-h-72 items-center justify-center rounded-3xl bg-base-200 p-6 sm:min-h-96">
          <div className="skeleton h-56 w-56 max-w-full rounded-3xl sm:h-72 sm:w-72" />
        </div>

        {/* Product information */}
        <div className="space-y-6 py-2">
          <div className="skeleton h-5 w-28 rounded-full" />
          <div className="skeleton h-8 w-full max-w-sm" />
          <div className="skeleton h-4 w-40" />

          {/* Current price */}
          <div className="rounded-2xl border border-base-300 p-5">
            <div className="skeleton h-4 w-28" />
            <div className="skeleton mt-3 h-9 w-48 max-w-full" />
            <div className="skeleton mt-3 h-5 w-24 rounded-full" />
          </div>

          {/* Price information */}
          <div className="space-y-3">
            <div className="skeleton h-5 w-40" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-4/5" />
          </div>

          {/* Market information */}
          <div className="rounded-2xl bg-base-200 p-5">
            <div className="skeleton h-5 w-36" />
            <div className="skeleton mt-4 h-4 w-48 max-w-full" />
            <div className="skeleton mt-3 h-4 w-32" />
          </div>

          <div className="skeleton h-12 w-48 rounded-xl" />
        </div>
      </section>
    </main>
  );
}