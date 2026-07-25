"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { MdEmail } from "react-icons/md";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpFormData, signUpSchema } from "@/schemas/signUpSchema";
import Link from "next/link";

const inputClass =
  "h-12 w-full bg-slate-50 pl-10 pr-10 border-gray-200 text-gray-600 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0";

type InputFieldProps = {
  icon: React.ReactNode;
  placeholder: string;
  error?: string;
  registration: ReturnType<typeof useForm<SignUpFormData>>["register"];
  name: keyof SignUpFormData;
  type?: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

function InputField({
  icon,
  placeholder,
  error,
  registration,
  name,
  type = "text",
  isPassword = false,
  showPassword,
  onTogglePassword,
}: InputFieldProps) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          {icon}
        </span>

        <Input
          {...registration(name)}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`${inputClass} ${
            error ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFormData) {
    console.log(data);

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-5"
    >
      <InputField
        icon={<User className="h-5 w-5" />}
        placeholder="Your Name"
        registration={register}
        name="userName"
        error={errors.userName?.message}
      />

      <InputField
        icon={<MdEmail className="h-5 w-5" />}
        placeholder="Your Email"
        type="email"
        registration={register}
        name="userEmail"
        error={errors.userEmail?.message}
      />

      <InputField
        icon={<Lock className="h-5 w-5" />}
        placeholder="Your Password"
        isPassword
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        registration={register}
        name="password"
        error={errors.password?.message}
      />

      <InputField
        icon={<Lock className="h-5 w-5" />}
        placeholder="Confirm your password"
        isPassword
        showPassword={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
        registration={register}
        name="confirmPassword"
        error={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        className="h-12 w-full rounded-full cursor-pointer bg-[#5C9EAD] font-semibold hover:bg-white hover:border-[#5C9EAD] duration-500 hover:text-[#5C9EAD]"
      >
        SIGN UP
      </Button>
      <Button
        variant="outline"
        className="h-12 w-full rounded-full border-[#5C9EAD] text-[#5C9EAD] font-semibold hover:bg-[#4f8a98] duration-500 hover:text-white"
      >
        <Link href="/signIn">
          Already have an account?
        </Link>
      </Button>
    </form>
  );
}