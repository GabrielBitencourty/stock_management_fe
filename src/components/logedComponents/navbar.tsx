"user client"

import Link from "next/link"
import { Button } from "../ui/button"

export default function Navbar() {
    return (
    <header className="absolute top-0 z-50 w-full bg-[#5C9EAD] backdrop-blur">
      <div className="container flex h-14 items-center justify-between pl-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block text-[#EDF0DA]">Stock Management</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm">
            <Link href="/signIn">Sign In</Link>
          </Button>
          <Button size="sm">
            <Link href="/signUp">Sign Up</Link>
          </Button>
          <Button size="sm">
            <Link href="/home">Home</Link>
          </Button>
        </div>
      </div>
    </header>
    )
}