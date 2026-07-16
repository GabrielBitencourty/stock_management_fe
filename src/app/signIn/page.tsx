import { LoginCard } from "@/components/customComponents/LoginCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef2f5]">
      <Card className="grid h-160 w-full max-w-7xl overflow-hidden rounded-2xl p-0 m-0 border-0 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:grid-cols-2">
        <section className="flex items-center  bg-linear-to-br from-[#67A8B6] via-[#5C9EAD] to-[#4E8D9A] px-24">
            <div className="w-full max-w-lg flex flex-col gap-5">
                <h1 className="text-[#EDF0DA] text-4xl font-bold">Welcome Back!</h1>
                <p className="text-[#EDF0DA]">To keep connected with us, please login with your account!</p>
                <Button
                    variant="outline"
                    className="h-10 w-40 rounded-full border border-white bg-transparent text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#5C9EAD]"
                > 
                  <Link href="/signUp">Sign Up?</Link>
                </Button>
            </div>
        </section>

        <section className="flex items-center justify-center bg-white px-24">
          <div className="w-full max-w-lg">
            <LoginCard />
          </div>
        </section>

      </Card>
    </main>
  );
}