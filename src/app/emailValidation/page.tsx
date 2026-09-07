import { Mail, ArrowLeft } from "lucide-react";
import { VerificationCode } from "@/components/customComponents/VerificationCode";

export default function VerifyEmailPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F8F9] px-4 py-8">

      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#5C9EAD]/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#67A8B6]/10 blur-3xl" />

      <div className="relative w-full max-w-md">

        <div className="rounded-3xl border border-black/5 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-10">

          <div className="mb-7 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5C9EAD]/10">
              <Mail className="h-8 w-8 text-[#5C9EAD]" />
            </div>
          </div>

          <div className="text-center">

            <h1 className="text-2xl font-bold tracking-tight text-[#263238] sm:text-3xl">
              Verify your email
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              We&apos;ve sent a verification code to your email address.
              Enter the code below to activate your account.
            </p>

          </div>

          <div className="mt-6 rounded-xl bg-[#F5F8F9] px-4 py-3 text-center">
            <p className="text-sm font-medium text-[#263238]">
              your-email@example.com
            </p>
          </div>

          <div className="mt-8">
            <label className="mb-3 block text-center text-sm font-medium text-[#263238]">
                Verification code
            </label>

            <VerificationCode />
          </div>

          <button
            type="button"
            className="
              mt-8
              w-full
              rounded-xl
              bg-[#5C9EAD]
              px-4
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              hover:bg-[#4E8D9A]
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            Verify account
          </button>

          <div className="mt-6 text-center">

            <p className="text-sm text-gray-500">
              Didn&apos;t receive the email?
            </p>

            <button
              type="button"
              className="
                mt-1
                text-sm
                font-semibold
                text-[#5C9EAD]
                transition-colors
                hover:text-[#477F8B]
                hover:underline
              "
            >
              Resend verification code
            </button>

          </div>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center">

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-500
                transition-colors
                hover:text-[#5C9EAD]
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </button>

          </div>

        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} StockManager
        </p>

      </div>
    </main>
  );
}