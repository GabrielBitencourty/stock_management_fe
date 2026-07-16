"use client";

import { BotMessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export function AssistenteButton() {
    return (
        <main className="flex items-end justify-end p-14 absolute w-15 h-50">
            <div>
                <Button
                    variant="outline"
                    type="submit"
                    className="fixed bottom-6 right-6 h-15 w-15 rounded-full bg-[#5C9EAD] hover:bg-[#349ab1] text-white shadow-lg shadow-black/20 border transition-all duration-200"
                >
                    <BotMessageSquare className="size-5"/>
                </Button>
            </div>
        </main>
    )
}