import { LoginCard } from "@/components/customComponents/LoginCard";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 md:px-8">
      <div
        className="
          w-full
          max-w-7xl
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          md:grid
          md:grid-cols-2
        "
      >
        <section
          className="
            hidden
            md:flex
            h-full
            items-center
            justify-center
            bg-linear-to-br
            from-[#67A8B6]
            via-[#5C9EAD]
            to-[#4E8D9A]
            px-10
            lg:px-24
          "
        >
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold text-[#EDF0DA]">
              Welcome Back!
            </h1>

            <p className="text-lg leading-relaxed text-[#EDF0DA]/90">
              To keep connected with us, please login with your account.
            </p>
          </div>
        </section>

        <section
          className="
            flex
            items-center
            justify-center
            bg-white
            px-6
            py-10
            sm:px-10
            md:px-16
            lg:px-24
          "
        >
          <div className="w-full max-w-md">
            <LoginCard />
          </div>
        </section>
      </div>
    </main>
  );
}