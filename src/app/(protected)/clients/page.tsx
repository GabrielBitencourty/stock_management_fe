"use client";

import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";

import {
    Search,
    Plus,
    Users,
    UserCheck,
    UserPlus,
    DollarSign,
    MoreVertical,
    SlidersHorizontal,
    ArrowUpDown,
} from "lucide-react";

const clients = [
    {
        id: 1,
        name: "João Silva",
        email: "joao.silva@email.com",
        phone: "(31) 99999-1234",
        createdAt: "12/01/2026",
        purchases: 12,
        totalSpent: "R$ 5.429,80",
        status: "Ativo",
    },
    {
        id: 2,
        name: "Maria Oliveira",
        email: "maria.oliveira@email.com",
        phone: "(31) 98888-4567",
        createdAt: "25/02/2026",
        purchases: 8,
        totalSpent: "R$ 2.849,50",
        status: "Ativo",
    },
    {
        id: 3,
        name: "Carlos Souza",
        email: "carlos.souza@email.com",
        phone: "(31) 97777-8910",
        createdAt: "08/03/2026",
        purchases: 3,
        totalSpent: "R$ 749,90",
        status: "Ativo",
    },
    {
        id: 4,
        name: "Ana Costa",
        email: "ana.costa@email.com",
        phone: "(31) 96666-1122",
        createdAt: "19/04/2026",
        purchases: 0,
        totalSpent: "R$ 0,00",
        status: "Inativo",
    },
    {
        id: 5,
        name: "Pedro Santos",
        email: "pedro.santos@email.com",
        phone: "(31) 95555-3344",
        createdAt: "02/05/2026",
        purchases: 5,
        totalSpent: "R$ 1.249,90",
        status: "Ativo",
    },
];

export default function ClientsPage() {
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
                                Clientes
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Gerencie seus clientes e acompanhe o histórico de compras.
                            </p>
                        </div>

                        <button
                            className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                            style={{ backgroundColor: "#5C9EAD" }}
                        >
                            <Plus size={18} />
                            Novo cliente
                        </button>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* TOTAL */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total de clientes
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        248
                                    </h2>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                                    <Users
                                        size={21}
                                        className="text-slate-600"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* ATIVOS */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Clientes ativos
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        231
                                    </h2>

                                    <p className="mt-1 text-xs text-emerald-600">
                                        93,1% da base
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                                    <UserCheck
                                        size={21}
                                        className="text-emerald-600"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* NOVOS */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Novos clientes
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        18
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Este mês
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
                                    <UserPlus
                                        size={21}
                                        className="text-sky-600"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* TICKET */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Ticket médio
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        R$ 427,50
                                    </h2>

                                    <p className="mt-1 text-xs text-emerald-600">
                                        +6,4% este mês
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

                    </div>

                    {/* CLIENTS TABLE */}
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
                                    placeholder="Buscar cliente..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/20"
                                />

                            </div>

                            {/* FILTERS */}
                            <div className="flex flex-wrap gap-2">

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

                            <table className="w-full min-w-[1000px]">

                                <thead className="bg-slate-50">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Cliente
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Contato
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Cadastro
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Compras
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Total gasto
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4"></th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {clients.map((client) => (

                                        <tr
                                            key={client.id}
                                            className="cursor-pointer transition hover:bg-slate-50/70"
                                        >

                                            {/* CLIENT */}
                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                                                        style={{
                                                            backgroundColor:
                                                                "#5C9EAD20",
                                                            color: "#5C9EAD",
                                                        }}
                                                    >
                                                        {client.name
                                                            .split(" ")
                                                            .map((name) => name[0])
                                                            .slice(0, 2)
                                                            .join("")}
                                                    </div>

                                                    <div>

                                                        <p className="font-semibold text-slate-800">
                                                            {client.name}
                                                        </p>

                                                        <p className="text-xs text-slate-400">
                                                            ID #{client.id}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* CONTACT */}
                                            <td className="px-6 py-4">

                                                <div>
                                                    <p className="text-sm text-slate-700">
                                                        {client.email}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {client.phone}
                                                    </p>
                                                </div>

                                            </td>

                                            {/* DATE */}
                                            <td className="px-6 py-4">

                                                <span className="text-sm text-slate-500">
                                                    {client.createdAt}
                                                </span>

                                            </td>

                                            {/* PURCHASES */}
                                            <td className="px-6 py-4">

                                                <span className="text-sm font-semibold text-slate-700">
                                                    {client.purchases}
                                                </span>

                                            </td>

                                            {/* TOTAL */}
                                            <td className="px-6 py-4">

                                                <span className="text-sm font-bold text-slate-800">
                                                    {client.totalSpent}
                                                </span>

                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-4">

                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        client.status === "Ativo"
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-slate-100 text-slate-500"
                                                    }`}
                                                >
                                                    {client.status}
                                                </span>

                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-6 py-4">

                                                <button
                                                    onClick={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                >
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
                                    248
                                </span>{" "}
                                clientes
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