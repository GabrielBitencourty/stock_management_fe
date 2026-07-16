import { FaFacebook, FaGooglePlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import { LoginForm } from "./LoginForm";

export function LoginCard() {
  return (
    <main className="flex gap-7 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-[#5C9EAD]">Login Into Your Account</h1>
        <div className="flex gap-7">
            <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-300 w-12 h-12"
            >
                <FaFacebook className="size-6 text-[#5C9EAD] fill-[#5C9EAD]" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-300 w-12 h-12"
            >
                <FaGooglePlus className="size-6 text-[#5C9EAD] fill-[#5C9EAD]" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-300 w-12 h-12"
            >
                <FaGithub className="size-6 text-[#5C9EAD] fill-[#5C9EAD]" />
            </Button>
        </div>
        <p className="text-[#4D5057]">or use your credentials to sign-in:</p>
        
        <div className="flex items-center w-full my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 bg-white text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div>
            <LoginForm />
        </div>
    </main>
  );
}