"user client"

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Input } from "../ui/input"

export default function Navbar() {
  return (
    <header className="absolute top-0 w-full shadow-md bg-[#5C9EAD] backdrop-blur">
      <div className="container flex h-14 items-center justify-end">
        <div className="relative mx-8 flex-1 max-w-2xl">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
            size={18}
          />

          <Input
            placeholder="Searching for..."
            className="pl-10 h-10 w-full rounded-lg border-none bg-white text-black"
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white">
            Gabriel Bitencourt
          </p>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar.png" alt="Gabriel" />
            <AvatarFallback>GB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}