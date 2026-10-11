export default function HomeLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-6 sm:px-6">
      {/* Hero skeleton */}
      <section className="flex min-h-72 flex-col gap-8 rounded-3xl bg-base-200 p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-5">
          <div className="skeleton h-7 w-48 rounded-full" />
          <div className="skeleton h-8 w-full max-w-lg" />
          <div className="skeleton h-8 w-4/5 max-w-md" />
          <div className="skeleton h-4 w-full max-w-lg" />
          <div className="skeleton h-4 w-3/4 max-w-md" />
          <div className="skeleton h-12 w-44 rounded-xl" />
        </div>

        <div className="skeleton h-48 w-full rounded-2xl md:w-2/5" />
      </section>

      {/* Price section heading */}
      <section className="space-y-6">
        <div className="space-y-3">
          <div className="skeleton h-7 w-52" />
          <div className="skeleton h-4 w-72 max-w-full" />
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
        </div>
      </section>
    </main>
  );
}