"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { LoaderCircle, UserRound, Pencil } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-green-700" />
      </div>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <UserRound className="mx-auto mb-4 h-12 w-12 text-gray-400" />

          <h1 className="text-2xl font-bold text-gray-900">
            আপনি লগইন করেননি
          </h1>

          <p className="mt-2 text-gray-600">
            আপনার প্রোফাইল দেখতে প্রথমে লগইন করুন।
          </p>

          <Link
            href="/signin"
            className="mt-6 inline-flex rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-[60vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-32 bg-green-800" />

          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-green-100 text-3xl font-bold text-green-800 shadow-sm">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name?.charAt(0)?.toUpperCase() || "U"
              )}
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              আমার প্রোফাইল
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              আপনার ব্যক্তিগত তথ্য
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-sm font-medium text-gray-500">নাম</p>
                <p className="mt-1 break-words text-lg font-semibold text-gray-900">
                  {user.name || "নাম দেওয়া হয়নি"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">ইমেইল</p>
                <p className="mt-1 break-words text-lg text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

            <Link
              href="/profile/update"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 sm:w-auto"
            >
              <Pencil size={18} />
              তথ্য আপডেট করুন
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}