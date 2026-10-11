export default function CategoryLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="skeleton h-4 w-16" />
        <div className="skeleton h-4 w-4" />
        <div className="skeleton h-4 w-28" />
      </div>

      {/* Category header */}
      <section className="mb-8 rounded-3xl bg-base-200 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-2xl" />

          <div className="flex-1 space-y-3">
            <div className="skeleton h-7 w-48 max-w-full" />
            <div className="skeleton h-4 w-64 max-w-full" />
          </div>
        </div>
      </section>

      {/* Filter and result count */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="skeleton h-5 w-36" />
        <div className="skeleton h-10 w-40 rounded-xl" />
      </div>

      {/* Category product grid */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-base-300 bg-base-100 p-4"
          >
            <div className="skeleton mx-auto h-24 w-24 rounded-2xl sm:h-28 sm:w-28" />

            <div className="mt-5 space-y-3">
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-6 w-2/3" />
              <div className="skeleton h-5 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}