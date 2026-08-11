import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    User,
    Settings,
    Bell,
    LogOut,
    ChevronDown,
} from "lucide-react";

export default function Navbar() {
    return (
        <header className="fixed top-0 right-0 left-72 z-10 border-0 bg-white shadow-md">
            <div className="flex h-14 w-full items-center justify-end px-6">

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-(--font-blue)">
                            <p className="text-sm font-semibold text-(--font-blue)">
                                Gabriel Bitencourt
                            </p>

                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src="/avatar.png"
                                    alt="Gabriel"
                                />

                                <AvatarFallback>
                                    GB
                                </AvatarFallback>
                            </Avatar>

                            <ChevronDown />

                        </button>
                    </DropdownMenuTrigger>

                   <DropdownMenuContent
    align="end"
    className="w-56"
>
    <DropdownMenuGroup>
        <DropdownMenuLabel>
            <div className="flex flex-col">
                <span className="font-semibold">
                    Gabriel Bitencourt
                </span>

                <span className="text-xs font-normal text-slate-500">
                    gabriel@email.com
                </span>
            </div>
        </DropdownMenuLabel>

        <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Minha conta</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificações</span>
        </DropdownMenuItem>
    </DropdownMenuGroup>

    <DropdownMenuSeparator />

    <DropdownMenuItem className="text-red-600 focus:text-red-600">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sair</span>
    </DropdownMenuItem>
</DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    );
}