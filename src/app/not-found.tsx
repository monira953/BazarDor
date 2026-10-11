import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-base-200 px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm sm:p-12">
        <div className="mb-6 text-7xl sm:text-8xl" aria-hidden="true">
          🔍
        </div>

        <p className="text-sm font-bold uppercase tracking-widest text-success">
          Error 404
        </p>

        <h1 className="mt-3 text-2xl font-bold text-base-content sm:text-3xl">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-4 max-w-sm leading-7 text-base-content/70">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          পেজটি সরিয়ে ফেলা হতে পারে অথবা ঠিকানাটি ভুল হতে পারে।
        </p>

        <Link
          href="/"
          className="btn btn-success mt-8 gap-2 text-white"
        >
          <Home size={18} />
          হোম পেজে ফিরে যান
        </Link>

        
      </div>
    </main>
  );
}