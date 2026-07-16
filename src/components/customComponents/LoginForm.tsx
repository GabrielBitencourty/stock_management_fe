"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

export function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form className="space-y-5">
      <div className="relative w-full max-w-sm">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MdEmail className="h-5 w-5 text-gray-400" />
        </span>
        <Input
          type="email"
          placeholder="example@email.com"
          className="pl-10 h-12 w-100 bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-200 text-gray-600"
        />
      </div>

      <div className="relative w-full max-w-sm">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </span>

        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Your Password"
          className="pl-10 h-12 w-100 bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-200 text-gray-600"
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <Link
          href="/forgot-password"
          className="text-[#5C9EAD] hover:underline"
        >
          Esqueceu sua senha?
        </Link>
      </div>

      <Button
        variant="outline"
        type="submit"
        className="w-full h-12 rounded-full border bg-[#5C9EAD] text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#5C9EAD]"
      >
        SIGN IN
      </Button>
    </form>
  );
}