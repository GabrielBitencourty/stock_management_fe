"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { MdEmail } from "react-icons/md";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signIn } from "@/services/authService";
import { loginSchema } from "@/schemas/authSchema";

type LoginFormData = z.infer<typeof loginSchema>;

const inputClass =
  "h-12 w-full bg-slate-50 pl-10 transition-colors";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userEmail: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    const response = await signIn(data);
    console.log(response);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <div className="relative">
          <MdEmail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <Input
            type="email"
            placeholder="example@email.com"
            className={`${inputClass} ${
              errors.userEmail ? "border-red-500" : ""
            }`}
            {...register("userEmail")}
          />
        </div>

        {errors.userEmail && (
          <p className="mt-2 text-sm text-red-500">
            {errors.userEmail.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            className={`${inputClass} pr-10 ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password")}
          />

          <button
            type="button"
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-[#5C9EAD] transition-colors hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-[#5C9EAD] font-semibold hover:bg-[#4f8a98]"
      >
        {isSubmitting ? "Signing in..." : "SIGN IN"}
      </Button>
    </form>
  );
}