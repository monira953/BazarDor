import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-green-800 bg-[#14532D] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-8">
        {/* Left: Brand and tagline */}
        <Link
          href="/"
          aria-label="বাজার দর - হোম পেজ"
          className="inline-flex items-center gap-3 self-start"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white">
            <ShoppingCart size={21} />
          </span>

          <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-lg font-bold text-white">
              বাজার দর
            </span>

            <span className="text-sm text-green-100">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </span>
          </span>
        </Link>

        {/* Right: Price disclaimer */}
        <p className="max-w-md text-sm leading-6 text-green-100 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}