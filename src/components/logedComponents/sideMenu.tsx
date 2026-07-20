"use client";

import {
  ChartColumnBig,
  Contact,
  HandCoins,
  Package,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    name: "Dashboard",
    href: "/home",
    icon: LayoutDashboard,
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: HandCoins,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
  },
  {
    name: "Clients",
    href: "/clients",
    icon: ChartColumnBig,
  },
  {
    name: "Employees",
    href: "/employees",
    icon: Contact,
  },
];

export default function SideMenu() {
  return (
    <aside className="shadow-2xl fixed left-0 top-0 flex h-screen w-72 flex-col bg-[#5C9EAD] px-5 py-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          Stock<span className="text-orange-300"> Management</span>
        </h1>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-3">
        {menuItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-white/15"
          >
            <Icon
              size={22}
              className="text-orange-300"
            />

            <span>{name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <footer className="border-t border-white/20 pt-5 text-xs text-white">
        <p>
          © Developed by{" "}
          <Link
            href="https://www.linkedin.com/in/gabriel-bitencourt-931b4b248/"
            target="_blank"
            className="text-orange-300 hover:underline"
          >
            Gabriel Bitencourt
          </Link>
          , all rights reserved.
        </p>
      </footer>
    </aside>
  );
}