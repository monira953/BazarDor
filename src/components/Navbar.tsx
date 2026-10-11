
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  UserRound,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

import { signOut, useSession } from "@/lib/auth-client";
import type { Category } from "@/lib/utils";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/categories`);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result: unknown = await response.json();

        let categoryList: Category[] = [];

        if (Array.isArray(result)) {
          categoryList = result as Category[];
        } else if (
          typeof result === "object" &&
          result !== null &&
          "data" in result &&
          Array.isArray(result.data)
        ) {
          categoryList = result.data as Category[];
        } else if (
          typeof result === "object" &&
          result !== null &&
          "categories" in result &&
          Array.isArray(result.categories)
        ) {
          categoryList = result.categories as Category[];
        }

        if (!cancelled) {
          setCategories(categoryList);
        }
      } catch (error) {
        console.error("Category loading error:", error);
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSignOut() {
    setLoggingOut(true);

    try {
      await signOut();

      setMobileMenuOpen(false);
      toast.success("সফলভাবে লগআউট হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoggingOut(false);
    }
  }

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex shrink-0 items-center gap-3"
          aria-label="বাজার দর হোম"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-800 text-white">
            <ShoppingCart size={23} strokeWidth={2.2} />
          </span>

          <span>
            <span className="block text-xl font-bold leading-tight text-green-900">
              বাজার দর
            </span>
            <span className="hidden text-xs text-base-content/60 sm:block">
              প্রতিদিনের বাজারের হিসাব
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-5 md:flex"
          aria-label="প্রধান নেভিগেশন"
        >

        </nav>

        {/* Desktop authentication */}
        <div className="hidden items-center gap-2 sm:flex">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-green-800" />
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="btn btn-ghost btn-sm gap-2"
              >
                <UserRound size={17} />
                <span className="max-w-28 truncate">
                  {user.name || "আমার প্রোফাইল"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={loggingOut}
                className="btn btn-outline btn-sm"
              >
                <LogOut size={16} />
                {loggingOut ? "অপেক্ষা করুন..." : "লগআউট"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-ghost btn-sm gap-2"
              >
                <LogIn size={16} />
                লগইন
              </Link>

              <Link
                href="/signup"
                className="btn btn-success btn-sm gap-2 text-white"
              >
                <UserPlus size={16} />
                রেজিস্টার
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="btn btn-ghost btn-square md:hidden"
          aria-label={
            mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop category navigation */}
      {categories.length > 0 && (
        <div className="hidden border-t border-base-200 md:block">
          <nav
            className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6"
            aria-label="পণ্যের ক্যাটাগরি"
          >
            {categories.map((category) => {
              const href = `/category/${category.slug}`;
              const active = pathname === href;

              return (
                <Link
                  key={category.id}
                  href={href}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-green-800 font-semibold text-white"
                      : "text-base-content/80 hover:bg-green-50 hover:text-green-900"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-base-300 bg-base-100 px-4 py-4 md:hidden"
        >
          <nav
            className="flex flex-col gap-1"
            aria-label="মোবাইল নেভিগেশন"
          >
            
            {categories.map((category) => {
              const href = `/category/${category.slug}`;
              const active = pathname === href;

              return (
                <Link
                  key={category.id}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-base-200 ${
                    active ? "bg-green-50 font-semibold text-green-900" : ""
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                  <ChevronDown
                    className="ml-auto -rotate-90"
                    size={15}
                  />
                </Link>
              );
            })}

            <div className="my-2 border-t border-base-300" />

            {isPending ? (
              <p className="px-3 py-2 text-sm text-base-content/60">
                লোড হচ্ছে...
              </p>
            ) : user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-base-200"
                >
                  <UserRound size={17} />
                  আমার প্রোফাইল
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={loggingOut}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-700 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  {loggingOut ? "অপেক্ষা করুন..." : "লগআউট"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-base-200"
                >
                  <LogIn size={17} />
                  লগইন
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-base-200"
                >
                  <UserPlus size={17} />
                  রেজিস্টার
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}