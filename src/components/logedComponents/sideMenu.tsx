"use client";

import {
    BarChart3,
    LayoutDashboard,
    Package,
    Settings,
    ShoppingCart,
    Truck,
    Users,
    Warehouse,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    {
        name: "Dashboard",
        href: "/home",
        icon: LayoutDashboard,
    },
    {
        name: "Produtos",
        href: "/products",
        icon: Package,
    },
    {
        name: "Vendas",
        href: "/sales",
        icon: ShoppingCart,
    },
    {
        name: "Estoque",
        href: "/stock",
        icon: Warehouse,
    },
    {
        name: "Relatórios",
        href: "/reports",
        icon: BarChart3,
    },
    {
        name: "Clientes",
        href: "/clients",
        icon: Users,
    },
    {
        name: "Fornecedores",
        href: "/suppliers",
        icon: Truck,
    },
    {
        name: "Configurações",
        href: "/settings",
        icon: Settings,
    },
];

export default function SideMenu() {
    const pathname = usePathname();

    return (
        <aside
            className="
                fixed
                left-0
                top-0
                z-50
                hidden
                h-screen
                w-72
                flex-col
                border-r
                border-slate-200
                bg-white
                lg:flex
            "
        >
            {/* Logo */}
            <div className="px-6 py-7">
                <Link href="/home">
                    <h1 className="text-2xl font-bold tracking-tight">
                        <span className="text-(--font-blue)">
                            Stock
                        </span>{" "}
                        <span className="text-slate-700">
                            Management
                        </span>
                    </h1>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 justify-center flex-col px-4 pt-8">
                <div className="space-y-2">
                    {menuItems.map(
                        ({ name, href, icon: Icon }) => {
                            const isActive =
                                pathname === href ||
                                pathname.startsWith(`${href}/`);

                            return (
                                <Link
                                    key={name}
                                    href={href}
                                    className={`
                                        group
                                        flex
                                        items-center
                                        gap-4
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-200

                                        ${
                                            isActive
                                                ? "bg-[#e8f5f8] text-(--font-blue)"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-(--font-blue)"
                                        }
                                    `}
                                >
                                    <Icon
                                        size={20}
                                        strokeWidth={isActive ? 2.2 : 1.8}
                                        className={
                                            isActive
                                                ? "text-(--font-blue)"
                                                : "text-slate-500 group-hover:text-(--font-blue)"
                                        }
                                    />

                                    <span>{name}</span>
                                </Link>
                            );
                        }
                    )}
                </div>
            </nav>

            {/* Footer */}
            <footer className="border-t border-slate-200 px-5 py-4">
                <p className="text-center text-[11px] leading-5 text-slate-400">
                    © Developed by{" "}
                    <span className="font-medium text-(--font-blue)">
                        Gabriel Bitencourt
                    </span>
                    .
                    <br />
                    All rights reserved.
                </p>
            </footer>
        </aside>
    );
}