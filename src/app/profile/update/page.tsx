"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?callbackUrl=/profile/update");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-green-700" />
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName === session.user.name) {
      toast("কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ!");
        return;
      }

      toast.success("প্রোফাইল আপডেট হয়েছে! 🎉");
      router.push("/profile");
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className="min-h-[60vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-xl">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
        >
          <ArrowLeft size={18} />
          প্রোফাইলে ফিরে যান
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900">
            প্রোফাইল আপডেট করুন
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
          </p>

          <form onSubmit={handleUpdate} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                maxLength={100}
                disabled={isUpdating}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                ইমেইল
              </label>

              <input
                type="email"
                value={session.user.email}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
              />

              <p className="mt-2 text-xs text-gray-500">
                এই পেজ থেকে শুধু নাম পরিবর্তন করা যাবে।
              </p>
            </div>

            <button
              type="submit"
              disabled={isUpdating || !name.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  আপডেট হচ্ছে...
                </>
              ) : (
                <>
                  <Save size={18} />
                  পরিবর্তন সংরক্ষণ করুন
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}