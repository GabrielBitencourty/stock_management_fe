import Link from "next/link";

import { SignUpCard } from "@/components/customComponents/SignUpCard";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 md:px-8">
      <div
        className="
          w-full
          max-w-7xl
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          md:grid
          md:grid-cols-2
        "
      >
        <section
          className="
            flex
            items-center
            justify-center
            bg-white
            px-6
            py-10
            sm:px-10
            md:px-16
            lg:px-24
          "
        >
          <div className="w-full max-w-md">
            <SignUpCard />
          </div>
        </section>

        <section
          className="
            hidden
            h-full
            items-center
            justify-center
            bg-linear-to-br
            from-[#67A8B6]
            via-[#5C9EAD]
            to-[#4E8D9A]
            px-10
            lg:flex
            lg:px-24
          "
        >
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold text-[#EDF0DA]">
              Join with Us!
            </h1>

            <p className="text-lg leading-relaxed text-[#EDF0DA]/90">
              Create your account and get access to all our features.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}