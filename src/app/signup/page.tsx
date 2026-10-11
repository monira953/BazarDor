"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: callbackUrl || "/",
      });

      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
        return;
      }

      toast.success("রেজিস্ট্রেশন সফল! 🎉");

      router.push(callbackUrl || "/");
      router.refresh();
    } catch {
      toast.error("রেজিস্ট্রেশন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setIsGoogleLoading(true);

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: callbackUrl || "/",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে রেজিস্ট্রেশন করা যায়নি!");
        setIsGoogleLoading(false);
      }
    } catch {
      toast.error("Google দিয়ে রেজিস্ট্রেশন করা যায়নি!");
      setIsGoogleLoading(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-base-200/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <Link
            href="/"
            aria-label="বাজার দর হোম পেজ"
            className="mb-2 inline-flex items-center justify-center text-success"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl text-success-content">
              <ShoppingBasket size={27} />
            </span>
          </Link>

          <h1 className="mt-3 text-2xl font-bold">নতুন অ্যাকাউন্ট তৈরি করুন</h1>

          <p className="mt-2 text-sm text-base-content/60">
            বাজারদরের আপডেট পেতে রেজিস্টার করুন
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={isLoading || isGoogleLoading}
          className="btn btn-outline w-full"
        >
          {isGoogleLoading ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
              <path
                fill="#EA4335"
                d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.5 30.3 0 24 0 14.6 0 6.5 5.4 3 13.2l7.8 6.1C12.5 13.4 17.8 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.6-.2-3.1-.5-4.5H24v9h12.4c-.6 2.9-2.2 5.3-4.6 6.9l7.5 5.8c4.4-4.1 6.8-10.1 6.8-17.2Z"
              />
              <path
                fill="#FBBC05"
                d="M10.8 28.7a14.5 14.5 0 0 1 0-9.4L3 13.2a24 24 0 0 0 0 21.6l7.8-6.1Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.3 0 11.6-2.1 15.4-5.7l-7.5-5.8c-2.1 1.4-4.7 2.2-7.9 2.2-6.2 0-11.5-4.2-13.2-10l-7.8 6.1C6.5 43.5 14.6 48 24 48Z"
              />
            </svg>
          )}

          {isGoogleLoading
            ? "Google দিয়ে সংযোগ হচ্ছে..."
            : "Google দিয়ে চালিয়ে যান"}
        </button>

        <div className="divider my-6 text-xs text-base-content/50">
          অথবা ইমেইল দিয়ে
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text font-medium">আপনার নাম</span>
            </label>

            <div className="relative">
              <UserRound
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                size={18}
              />
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="আপনার পুরো নাম লিখুন"
                className="input input-bordered w-full pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text font-medium">ইমেইল ঠিকানা</span>
            </label>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                size={18}
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="input input-bordered w-full pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text font-medium">পাসওয়ার্ড</span>
            </label>

            <div className="relative">
              <LockKeyhole
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                size={18}
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                className="input input-bordered w-full px-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />

              <button
                type="button"
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
                onClick={() => setShowPassword((previous) => !previous)}
                disabled={isLoading || isGoogleLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="btn btn-success w-full text-success-content"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                অ্যাকাউন্ট তৈরি হচ্ছে...
              </>
            ) : (
              <>
                রেজিস্টার করুন
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content/70">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href={`/signin${
              callbackUrl
                ? `?callbackUrl=${encodeURIComponent(callbackUrl)}`
                : ""
            }`}
            className="font-semibold text-success hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center py-20">
          <LoaderCircle className="animate-spin text-success" size={32} />
        </main>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
