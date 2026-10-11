
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-4 h-8 w-48 rounded bg-base-200" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-base-300 p-4"
          >
            <div className="mb-4 h-28 rounded-xl bg-base-200" />
            <div className="mb-2 h-4 w-3/4 rounded bg-base-200" />
            <div className="h-4 w-1/2 rounded bg-base-200" />
          </div>
        ))}
      </div>
    </main>
  );
}