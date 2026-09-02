"use client";

import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";

import {
    Search,
    Plus,
    ShoppingCart,
    DollarSign,
    CheckCircle2,
    Clock3,
    MoreVertical,
    SlidersHorizontal,
    CalendarDays,
    ArrowUpDown,
} from "lucide-react";

const sales = [
    {
        id: "#VND-001",
        customer: "João Silva",
        date: "02/09/2026 14:32",
        payment: "Cartão de crédito",
        value: "R$ 4.599,90",
        status: "Concluída",
    },
    {
        id: "#VND-002",
        customer: "Maria Oliveira",
        date: "02/09/2026 13:15",
        payment: "PIX",
        value: "R$ 439,80",
        status: "Concluída",
    },
    {
        id: "#VND-003",
        customer: "Carlos Souza",
        date: "02/09/2026 11:47",
        payment: "Cartão de débito",
        value: "R$ 289,90",
        status: "Pendente",
    },
    {
        id: "#VND-004",
        customer: "Ana Costa",
        date: "01/09/2026 18:22",
        payment: "PIX",
        value: "R$ 749,90",
        status: "Concluída",
    },
    {
        id: "#VND-005",
        customer: "Pedro Santos",
        date: "01/09/2026 16:08",
        payment: "Dinheiro",
        value: "R$ 149,90",
        status: "Cancelada",
    },
];

export default function SalesPage() {
    return (
        <div className="min-h-screen w-full bg-slate-50">
            <SideMenu />
            <Navbar />

            <main className="pt-20 lg:pl-72">
                <div className="flex flex-col gap-6 p-6">

                    {/* HEADER */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Vendas
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Acompanhe suas vendas e movimentações financeiras.
                            </p>
                        </div>

                        <button
                            className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                            style={{ backgroundColor: "#5C9EAD" }}
                        >
                            <Plus size={18} />
                            Nova venda
                        </button>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* VENDAS */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Vendas hoje
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        24
                                    </h2>

                                    <p className="mt-1 text-xs font-medium text-emerald-600">
                                        +12,5% comparado a ontem
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                                    <ShoppingCart
                                        size={21}
                                        className="text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* FATURAMENTO */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Faturamento hoje
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        R$ 8.429,50
                                    </h2>

                                    <p className="mt-1 text-xs font-medium text-emerald-600">
                                        +8,2% comparado a ontem
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                                    <DollarSign
                                        size={21}
                                        className="text-emerald-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CONCLUÍDAS */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Concluídas
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        21
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-400">
                                        87,5% das vendas
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                                    <CheckCircle2
                                        size={21}
                                        className="text-emerald-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PENDENTES */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Pendentes
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        3
                                    </h2>

                                    <p className="mt-1 text-xs text-amber-500">
                                        Aguardando pagamento
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                                    <Clock3
                                        size={21}
                                        className="text-amber-500"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SALES TABLE */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        {/* TOOLBAR */}
                        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 xl:flex-row xl:items-center xl:justify-between">

                            {/* SEARCH */}
                            <div className="relative w-full xl:max-w-md">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Buscar por venda ou cliente..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/20"
                                />
                            </div>

                            {/* FILTERS */}
                            <div className="flex flex-wrap gap-2">

                                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                                    <CalendarDays size={17} />
                                    Período
                                </button>

                                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                                    <SlidersHorizontal size={17} />
                                    Status
                                </button>

                                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                                    <ArrowUpDown size={17} />
                                    Ordenar
                                </button>

                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">

                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Venda
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Cliente
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Data
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Pagamento
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Valor
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {sales.map((sale) => (
                                        <tr
                                            key={sale.id}
                                            className="transition hover:bg-slate-50/70"
                                        >

                                            {/* SALE */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                                                        style={{
                                                            backgroundColor:
                                                                "#5C9EAD20",
                                                        }}
                                                    >
                                                        <ShoppingCart
                                                            size={18}
                                                            style={{
                                                                color: "#5C9EAD",
                                                            }}
                                                        />
                                                    </div>

                                                    <span className="font-semibold text-slate-800">
                                                        {sale.id}
                                                    </span>

                                                </div>
                                            </td>

                                            {/* CUSTOMER */}
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-slate-700">
                                                    {sale.customer}
                                                </span>
                                            </td>

                                            {/* DATE */}
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-500">
                                                    {sale.date}
                                                </span>
                                            </td>

                                            {/* PAYMENT */}
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-600">
                                                    {sale.payment}
                                                </span>
                                            </td>

                                            {/* VALUE */}
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-slate-800">
                                                    {sale.value}
                                                </span>
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        sale.status === "Concluída"
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : sale.status === "Pendente"
                                                            ? "bg-amber-50 text-amber-600"
                                                            : "bg-red-50 text-red-500"
                                                    }`}
                                                >
                                                    {sale.status}
                                                </span>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-6 py-4">
                                                <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                                                    <MoreVertical size={19} />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {/* FOOTER */}
                        <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

                            <p className="text-sm text-slate-500">
                                Mostrando{" "}
                                <span className="font-semibold text-slate-700">
                                    5
                                </span>{" "}
                                de{" "}
                                <span className="font-semibold text-slate-700">
                                    128
                                </span>{" "}
                                vendas
                            </p>

                            <div className="flex gap-2">

                                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50">
                                    Anterior
                                </button>

                                <button
                                    className="rounded-lg px-3 py-2 text-sm font-semibold text-white"
                                    style={{
                                        backgroundColor: "#5C9EAD",
                                    }}
                                >
                                    1
                                </button>

                                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50">
                                    2
                                </button>

                                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50">
                                    Próximo
                                </button>

                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}