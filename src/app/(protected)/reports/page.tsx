"use client";

import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";

import {
    DollarSign,
    ShoppingCart,
    Users,
    TrendingUp,
    Download,
    CalendarDays,
    ArrowUpRight,
    MoreHorizontal,
} from "lucide-react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

const revenueData = [
    { month: "Jan", revenue: 12400 },
    { month: "Fev", revenue: 15800 },
    { month: "Mar", revenue: 14200 },
    { month: "Abr", revenue: 18900 },
    { month: "Mai", revenue: 22400 },
    { month: "Jun", revenue: 20100 },
    { month: "Jul", revenue: 26700 },
    { month: "Ago", revenue: 31400 },
];

const productsData = [
    { name: "Notebook", sales: 42 },
    { name: "Mouse", sales: 31 },
    { name: "Teclado", sales: 24 },
    { name: "Headset", sales: 18 },
    { name: "Webcam", sales: 15 },
];

const paymentData = [
    { name: "PIX", value: 48 },
    { name: "Cartão", value: 37 },
    { name: "Dinheiro", value: 15 },
];

const topClients = [
    {
        name: "João Silva",
        purchases: 15,
        total: "R$ 5.429,80",
    },
    {
        name: "Maria Oliveira",
        purchases: 9,
        total: "R$ 3.284,50",
    },
    {
        name: "Carlos Souza",
        purchases: 7,
        total: "R$ 2.190,00",
    },
    {
        name: "Ana Costa",
        purchases: 6,
        total: "R$ 1.849,90",
    },
];


// ==============================
// COMPONENTE DE KPI
// ==============================

function StatCard({
    title,
    value,
    percentage,
    icon: Icon,
}: {
    title: string;
    value: string;
    percentage: string;
    icon: React.ElementType;
}) {
    return (
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            {title}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            {value}
                        </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5C9EAD]/10">
                        <Icon className="h-5 w-5 text-[#5C9EAD]" />
                    </div>

                </div>

                <div className="mt-4 flex items-center gap-1 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-emerald-600" />

                    <span className="font-medium text-emerald-600">
                        {percentage}
                    </span>

                    <span className="text-slate-400">
                        vs. período anterior
                    </span>
                </div>

            </CardContent>
        </Card>
    );
}


// ==============================
// TOOLTIP DO GRÁFICO
// ==============================

function RevenueTooltip({
    active,
    payload,
    label,
}: any) {

    if (!active || !payload || !payload.length) {
        return null;
    }

    return (
        <div className="rounded-lg border bg-white p-3 shadow-lg">

            <p className="text-sm font-medium text-slate-700">
                {label}
            </p>

            <p className="mt-1 text-sm font-bold text-[#5C9EAD]">
                R$ {Number(payload[0].value).toLocaleString("pt-BR")}
            </p>

        </div>
    );
}


// ==============================
// PÁGINA
// ==============================

export default function ReportsPage() {

    return (
        <div className="min-h-screen w-full bg-slate-50">

            <SideMenu />

            <Navbar />


            <main className="pt-20 lg:pl-72">

                <div className="flex flex-col gap-6 p-6">


                    {/* ========================= */}
                    {/* HEADER */}
                    {/* ========================= */}

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Relatórios
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Acompanhe o desempenho do seu negócio.
                            </p>

                        </div>


                        <div className="flex items-center gap-2">

                            <Select defaultValue="month">

                                <SelectTrigger className="w-[160px] bg-white">
                                    <CalendarDays className="mr-2 h-4 w-4 text-slate-500" />
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="week">
                                        Últimos 7 dias
                                    </SelectItem>

                                    <SelectItem value="month">
                                        Este mês
                                    </SelectItem>

                                    <SelectItem value="quarter">
                                        Últimos 3 meses
                                    </SelectItem>

                                    <SelectItem value="year">
                                        Este ano
                                    </SelectItem>

                                </SelectContent>

                            </Select>


                            <Button
                                variant="outline"
                                className="bg-white"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Exportar
                            </Button>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* KPIs */}
                    {/* ========================= */}

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Faturamento"
                            value="R$ 31.400,00"
                            percentage="+14,8%"
                            icon={DollarSign}
                        />

                        <StatCard
                            title="Vendas"
                            value="184"
                            percentage="+9,4%"
                            icon={ShoppingCart}
                        />

                        <StatCard
                            title="Ticket médio"
                            value="R$ 170,65"
                            percentage="+6,2%"
                            icon={TrendingUp}
                        />

                        <StatCard
                            title="Novos clientes"
                            value="32"
                            percentage="+11,3%"
                            icon={Users}
                        />

                    </div>


                    {/* ========================= */}
                    {/* FATURAMENTO */}
                    {/* ========================= */}

                    <Card className="border-slate-200 shadow-sm">

                        <CardHeader>

                            <div className="flex items-center justify-between">

                                <div>

                                    <CardTitle>
                                        Faturamento
                                    </CardTitle>

                                    <CardDescription className="mt-1">
                                        Evolução do faturamento ao longo do período.
                                    </CardDescription>

                                </div>

                                <Badge
                                    variant="secondary"
                                    className="bg-[#5C9EAD]/10 text-[#5C9EAD]"
                                >
                                    +14,8%
                                </Badge>

                            </div>

                        </CardHeader>


                        <CardContent>

                            <div className="h-[320px] w-full">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <LineChart
                                        data={revenueData}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12 }}
                                        />

                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12 }}
                                            tickFormatter={(value) =>
                                                `R$ ${value / 1000}k`
                                            }
                                        />

                                        <Tooltip
                                            content={<RevenueTooltip />}
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#5C9EAD"
                                            strokeWidth={3}
                                            dot={false}
                                            activeDot={{
                                                r: 6,
                                                fill: "#5C9EAD",
                                            }}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                        </CardContent>

                    </Card>


                    {/* ========================= */}
                    {/* GRÁFICOS */}
                    {/* ========================= */}

                    <div className="grid gap-6 lg:grid-cols-2">


                        {/* PRODUTOS */}

                        <Card className="border-slate-200 shadow-sm">

                            <CardHeader>

                                <CardTitle>
                                    Produtos mais vendidos
                                </CardTitle>

                                <CardDescription>
                                    Produtos com maior volume de vendas.
                                </CardDescription>

                            </CardHeader>


                            <CardContent>

                                <div className="h-[300px]">

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <BarChart
                                            data={productsData}
                                            layout="vertical"
                                            margin={{
                                                left: 10,
                                                right: 20,
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                horizontal={false}
                                            />

                                            <XAxis
                                                type="number"
                                                axisLine={false}
                                                tickLine={false}
                                            />

                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                axisLine={false}
                                                tickLine={false}
                                                width={80}
                                            />

                                            <Tooltip />

                                            <Bar
                                                dataKey="sales"
                                                fill="#5C9EAD"
                                                radius={[0, 6, 6, 0]}
                                                barSize={24}
                                            />

                                        </BarChart>

                                    </ResponsiveContainer>

                                </div>

                            </CardContent>

                        </Card>


                        {/* PAGAMENTOS */}

                        <Card className="border-slate-200 shadow-sm">

                            <CardHeader>

                                <CardTitle>
                                    Formas de pagamento
                                </CardTitle>

                                <CardDescription>
                                    Distribuição das vendas por método.
                                </CardDescription>

                            </CardHeader>


                            <CardContent>

                                <div className="flex h-[300px] items-center justify-center">

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <PieChart>

                                            <Pie
                                                data={paymentData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={70}
                                                outerRadius={105}
                                                paddingAngle={4}
                                            >

                                                <Cell fill="#5C9EAD" />
                                                <Cell fill="#94A3B8" />
                                                <Cell fill="#CBD5E1" />

                                            </Pie>

                                            <Tooltip
                                                formatter={(value) =>
                                                    `${value}%`
                                                }
                                            />

                                        </PieChart>

                                    </ResponsiveContainer>

                                </div>


                                {/* LEGENDA */}

                                <div className="flex justify-center gap-6">

                                    <div className="flex items-center gap-2 text-sm">

                                        <span className="h-3 w-3 rounded-full bg-[#5C9EAD]" />

                                        PIX — 48%

                                    </div>

                                    <div className="flex items-center gap-2 text-sm">

                                        <span className="h-3 w-3 rounded-full bg-slate-400" />

                                        Cartão — 37%

                                    </div>

                                    <div className="flex items-center gap-2 text-sm">

                                        <span className="h-3 w-3 rounded-full bg-slate-300" />

                                        Dinheiro — 15%

                                    </div>

                                </div>

                            </CardContent>

                        </Card>

                    </div>


                    {/* ========================= */}
                    {/* TOP CLIENTES */}
                    {/* ========================= */}

                    <Card className="border-slate-200 shadow-sm">

                        <CardHeader>

                            <div className="flex items-center justify-between">

                                <div>

                                    <CardTitle>
                                        Clientes que mais compraram
                                    </CardTitle>

                                    <CardDescription>
                                        Ranking dos clientes com maior volume de compras.
                                    </CardDescription>

                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>

                            </div>

                        </CardHeader>


                        <CardContent className="p-0">

                            <Table>

                                <TableHeader>

                                    <TableRow>

                                        <TableHead className="w-[80px] pl-6">
                                            #
                                        </TableHead>

                                        <TableHead>
                                            Cliente
                                        </TableHead>

                                        <TableHead>
                                            Compras
                                        </TableHead>

                                        <TableHead className="text-right pr-6">
                                            Total
                                        </TableHead>

                                    </TableRow>

                                </TableHeader>


                                <TableBody>

                                    {topClients.map((client, index) => (

                                        <TableRow key={client.name}>

                                            <TableCell className="pl-6">

                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">

                                                    {index + 1}

                                                </div>

                                            </TableCell>


                                            <TableCell>

                                                <span className="font-medium text-slate-900">
                                                    {client.name}
                                                </span>

                                            </TableCell>


                                            <TableCell className="text-slate-500">

                                                {client.purchases} compras

                                            </TableCell>


                                            <TableCell className="text-right pr-6">

                                                <span className="font-semibold text-slate-900">
                                                    {client.total}
                                                </span>

                                            </TableCell>

                                        </TableRow>

                                    ))}

                                </TableBody>

                            </Table>

                        </CardContent>

                    </Card>

                </div>

            </main>

        </div>
    );
}