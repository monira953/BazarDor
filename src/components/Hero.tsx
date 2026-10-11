import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBanglaDate } from "@/lib/utils";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 sm:text-sm">
            {getBanglaDate()}
          </span>

          <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight text-green-950 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারদর তুলনা করুন
            সহজেই। প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-800 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
          >
            সব পণ্য দেখুন
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যে ভরা ঝুড়ি"
            width={420}
            height={420}
            priority
            className="h-auto w-full max-w-[320px] object-contain sm:max-w-[380px]"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-green-200/40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/40"
        aria-hidden="true"
      />
    </section>
  );
}
