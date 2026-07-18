"use client"

import { ChartNoAxesCombined } from "lucide-react"

export default function SideMenu() {
    return (
        <main className="flex flex-col justify-center p-3 fixed left-0 h-full gap-3 w-70 bg-[#5C9EAD]">
            <div className="text-[#EDF0DA] gap-2 text-2xl items-center flex">
                <ChartNoAxesCombined />
                <h1>Testando</h1>
            </div>
            <div>
                <h1>Testando</h1>
            </div>
        </main>
    )
}