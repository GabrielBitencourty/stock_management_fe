"use client";

import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";

export default function ProductsPage() {
    return(
        <div className="min-h-screen w-full bg-slate-50">
            <SideMenu />
            <Navbar />

            <main className="pt-20 lg:pl-72">
                <div className="flex flex-col gap-6 p-6">
                    <div>
                        <h1>Testando Paginade produtos</h1>
                    </div>
                </div>
            </main>

        </div>
    )
}