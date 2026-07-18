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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="w-full">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MdEmail className="h-5 w-5 text-gray-400" />
          </span>

          <Input
            type="Your email"
            placeholder="example@email.com"
            className={`pl-10 h-12 w-100 bg-gray-50 ${
              errors.userEmail ? "border-red-500" : ""
            }`}
            {...register("userEmail")}
          />
        </div>

        {errors.userEmail && (
          <p className="mt-1 text-sm text-red-500">
            {errors.userEmail.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </span>

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            className={`pl-10 pr-10 h-12 w-100 bg-gray-50 ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex pr-3 items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex justify-between text-sm">
        <Link
          href="/forgot-password"
          className="text-[#5C9EAD] hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-full bg-[#5C9EAD] text-white hover:bg-[#4f8a98]"
      >
        {isSubmitting ? "Entrando..." : "SIGN IN"}
      </Button>
    </form>
  );
}