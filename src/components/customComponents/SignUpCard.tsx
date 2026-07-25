import { FaFacebook, FaGooglePlus } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

import { Button } from "../ui/button";
import { SignUpForm } from "./SignUpForm";

const socialButtons = [
  {
    icon: FaFacebook,
    label: "Facebook",
  },
  {
    icon: FaGooglePlus,
    label: "Google",
  },
  {
    icon: FaGithub,
    label: "GitHub",
  },
];

export function SignUpCard() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center">
      <h1 className="text-center text-3xl font-bold text-[#5C9EAD] md:text-4xl">
        Create a new Account
      </h1>

      <div className="mt-8 flex items-center gap-4 md:gap-6">
        {socialButtons.map(({ icon: Icon, label }) => (
          <Button
            key={label}
            variant="outline"
            size="icon"
            aria-label={label}
            className="
              h-11
              w-11
              rounded-full
              border-slate-300
              transition-all
              duration-300
              hover:scale-105
              hover:border-[#5C9EAD]
              hover:bg-[#5C9EAD]/5
              md:h-12
              md:w-12
            "
          >
            <Icon className="text-xl text-[#5C9EAD]" />
          </Button>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Or use your credentials to sign in
      </p>

      <div className="my-8 flex w-full items-center">
        <div className="flex-1 border-t border-slate-300" />
        <span className="px-4 text-sm text-slate-500">or</span>
        <div className="flex-1 border-t border-slate-300" />
      </div>

      <div className="w-full">
        <SignUpForm />
      </div>
    </main>
  );
}