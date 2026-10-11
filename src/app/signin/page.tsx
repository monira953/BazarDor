"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, ShoppingBasket } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে!");
        return;
      }

      toast.success("সাইন ইন সফল! 🎉");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি!");
        setIsGoogleLoading(false);
      }
    } catch {
      toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
      setIsGoogleLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-base-200/50">
      <div className="w-full max-w-md rounded-2xl border border-base-200 bg-white p-8 shadow-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-green-800 mb-2">
            <ShoppingBasket size={28} />
          </Link>
          <span className="text-xl font-bold block">বাজার দর</span>
          <h1 className="mt-3 text-2xl font-bold">আবার ফিরে আসুন!</h1>
          <p className="mt-2 text-sm text-base-content/60">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          {isGoogleLoading ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.5 30.3 0 24 0 14.6 0 6.5 5.4 3 13.2l7.8 6.1C12.5 13.4 17.8 9.5 24 9.5Z" />
              <path fill="#4285F4" d="M46.1 24.5c0-1.6-.2-3.1-.5-4.5H24v9h12.4c-.6 2.9-2.2 5.3-4.6 6.9l7.5 5.8c4.4-4.1 6.8-10.1 6.8-17.2Z" />
              <path fill="#FBBC05" d="M10.8 28.7a14.5 14.5 0 0 1 0-9.4L3 13.2a24 24 0 0 0 0 21.6l7.8-6.1Z" />
              <path fill="#34A853" d="M24 48c6.3 0 11.6-2.1 15.4-5.7l-7.5-5.8c-2.1 1.4-4.7 2.2-7.9 2.2-6.2 0-11.5-4.2-13.2-10l-7.8 6.1C6.5 43.5 14.6 48 24 48Z" />
            </svg>
          )}
          Google দিয়ে চালিয়ে যান
        </button>

        <div className="divider my-6 text-xs text-base-content/50">
          অথবা ইমেইল দিয়ে
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text font-medium">ইমেইল ঠিকানা</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="input input-bordered w-full pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text font-medium">পাসওয়ার্ড</span>
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="input input-bordered w-full px-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="btn btn-success w-full text-white"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                সাইন ইন হচ্ছে...
              </>
            ) : (
              <>
                সাইন ইন
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content/70">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="font-semibold text-success hover:underline"
          >
            রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <LoaderCircle className="animate-spin text-green-800" size={32} />
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}