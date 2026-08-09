"use client";

import { useState } from "react";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ForgotPasswordCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Aqui futuramente entra sua chamada para a API
    console.log("Reset password:", email);

    setSubmitted(true);
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setEmail("");
      setSubmitted(false);
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <button
          type="button"
          className="text-sm text-[#5C9EAD] transition-colors hover:underline"
        >
          Forgot your password?
        </button>
      </DialogTrigger>

      <DialogContent
        className="
          max-w-md
          rounded-2xl
          border-none
          bg-white
          p-8
          shadow-2xl
        "
      >
        {!submitted ? (
          <>
            <DialogHeader className="items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#5C9EAD]/10">
                <ShieldCheck className="h-7 w-7 text-[#5C9EAD]" />
              </div>

              <DialogTitle className="text-2xl font-semibold text-slate-800">
                Forgot your password?
              </DialogTitle>

              <DialogDescription className="max-w-sm text-center text-slate-500">
                Don&apos;t worry. Enter the email associated with your
                account and we&apos;ll send you a link to reset your
                password.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div className="relative">
                <Mail
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    h-5
                    w-5
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="
                    h-12
                    bg-slate-50
                    pl-10
                    focus-visible:ring-[#5C9EAD]
                  "
                />
              </div>

              <Button
                type="submit"
                className="
                  h-12
                  w-full
                  rounded-full
                  bg-[#5C9EAD]
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-[#5C9EAD]
                  hover:ring-1
                  hover:ring-[#5C9EAD]
                "
              >
                SEND RESET LINK
              </Button>
            </form>

            <button
              type="button"
              onClick={() => {
                document.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    key: "Escape",
                  })
                );
              }}
              className="
                mx-auto
                flex
                items-center
                gap-2
                text-sm
                text-slate-500
                transition-colors
                hover:text-[#5C9EAD]
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <Mail className="h-7 w-7 text-green-600" />
            </div>

            <DialogTitle className="text-2xl font-semibold text-slate-800">
              Check your email
            </DialogTitle>

            <DialogDescription className="mt-3 max-w-sm text-slate-500">
              If an account exists with this email, we&apos;ve sent you
              a password reset link.
            </DialogDescription>

            <p className="mt-4 text-sm text-slate-400">
              Check your inbox and spam folder.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}