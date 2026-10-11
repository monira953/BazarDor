import Link from "next/link";
import { ShoppingCart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-green-300" />
            <span className="text-2xl font-bold">বাজার দর</span>
          </Link>

          <p className="max-w-sm text-sm leading-7 text-green-100/80">
            প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন সহজেই। বাজারের দর তুলনা করুন এবং সচেতনভাবে কেনাকাটা করুন।
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">দ্রুত লিংক</h2>

          <ul className="space-y-3 text-sm text-green-100/80">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                হোম
              </Link>
            </li>

            <li>
              <Link href="/#সব-পণ্য" className="transition-colors hover:text-white">
                সব পণ্য
              </Link>
            </li>

            <li>
              <Link href="/signin" className="transition-colors hover:text-white">
                লগইন
              </Link>
            </li>

            <li>
              <Link href="/signup" className="transition-colors hover:text-white">
                অ্যাকাউন্ট তৈরি করুন
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">গুরুত্বপূর্ণ তথ্য</h2>

          <p className="text-sm leading-7 text-green-100/80">
            এখানে প্রদর্শিত দাম তথ্যের সুবিধার্থে দেওয়া হয়েছে। বাজার, স্থান, সময় ও বিক্রেতাভেদে প্রকৃত দাম ভিন্ন হতে পারে। কেনাকাটার আগে স্থানীয় বাজারে দাম যাচাই করে নিন।
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-200 transition-colors hover:text-white"
          >
            বাজার দর ব্যবহার করুন
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-center text-xs text-green-100/70 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} বাজার দর (BazarDor)। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p>বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর</p>
        </div>
      </div>
    </footer>
  );
}