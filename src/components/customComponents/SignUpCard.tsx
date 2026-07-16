import { SignUpForm } from "./SignUpForm";

export function SignUpCard() {
    return (
        <main className="flex gap-7 flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-[#5C9EAD]">Create a new Account</h1>
            <p className="text-[#4D5057]">or use your credentials to sign-up:</p>

            <div className="flex items-center w-full my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 bg-white text-sm">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>
    
            <div>
                <SignUpForm />
            </div>
        </main>
    );
}