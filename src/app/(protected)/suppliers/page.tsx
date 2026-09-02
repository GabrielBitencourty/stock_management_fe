"use client";

import { useMemo, useState } from "react";

import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";

import {
    Building2,
    CheckCircle2,
    Clock3,
    Eye,
    FileText,
    MoreHorizontal,
    Package,
    Pencil,
    Plus,
    Search,
    ShoppingCart,
    Truck,
    Users,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";


// ============================================================
// TYPES
// ============================================================

type SupplierStatus = "active" | "inactive";

type PurchaseStatus =
    | "draft"
    | "ordered"
    | "waiting"
    | "received"
    | "cancelled";

type Supplier = {
    id: number;
    name: string;
    contact: string;
    email: string;
    phone: string;
    products: number;
    orders: number;
    lastPurchase: string;
    status: SupplierStatus;
    category: string;
};

type PurchaseItem = {
    product: string;
    quantity: number;
    unitPrice: number;
};

type PurchaseOrder = {
    id: string;
    supplier: string;
    date: string;
    items: PurchaseItem[];
    total: number;
    status: PurchaseStatus;
};


// ============================================================
// MOCK DATA
// ============================================================

const initialSuppliers: Supplier[] = [
    {
        id: 1,
        name: "Tech Distribuidora",
        contact: "Carlos Mendes",
        email: "carlos@techdistribuidora.com",
        phone: "(31) 99999-1234",
        products: 24,
        orders: 18,
        lastPurchase: "28/08/2026",
        status: "active",
        category: "Informática",
    },
    {
        id: 2,
        name: "Mega Eletrônicos",
        contact: "Mariana Souza",
        email: "mariana@megaeletronicos.com",
        phone: "(31) 98888-5678",
        products: 31,
        orders: 12,
        lastPurchase: "25/08/2026",
        status: "active",
        category: "Eletrônicos",
    },
    {
        id: 3,
        name: "Office Supply Brasil",
        contact: "João Pereira",
        email: "joao@officesupply.com",
        phone: "(31) 97777-4321",
        products: 17,
        orders: 9,
        lastPurchase: "18/08/2026",
        status: "active",
        category: "Escritório",
    },
    {
        id: 4,
        name: "Digital Solutions",
        contact: "Ana Costa",
        email: "ana@digitalsolutions.com",
        phone: "(31) 96666-8765",
        products: 13,
        orders: 6,
        lastPurchase: "10/08/2026",
        status: "inactive",
        category: "Tecnologia",
    },
    {
        id: 5,
        name: "Giga Hardware",
        contact: "Lucas Oliveira",
        email: "lucas@gigahardware.com",
        phone: "(31) 95555-1122",
        products: 28,
        orders: 21,
        lastPurchase: "30/08/2026",
        status: "active",
        category: "Hardware",
    },
];

const initialPurchaseOrders: PurchaseOrder[] = [
    {
        id: "PC-2026-001",
        supplier: "Tech Distribuidora",
        date: "30/08/2026",
        items: [
            {
                product: "Mouse Logitech G203",
                quantity: 20,
                unitPrice: 89.9,
            },
            {
                product: "Teclado Mecânico RGB",
                quantity: 10,
                unitPrice: 219.9,
            },
        ],
        total: 3997,
        status: "waiting",
    },
    {
        id: "PC-2026-002",
        supplier: "Mega Eletrônicos",
        date: "28/08/2026",
        items: [
            {
                product: "Monitor AOC 24",
                quantity: 8,
                unitPrice: 899.9,
            },
        ],
        total: 7199.2,
        status: "ordered",
    },
    {
        id: "PC-2026-003",
        supplier: "Giga Hardware",
        date: "25/08/2026",
        items: [
            {
                product: "SSD Kingston 1TB",
                quantity: 15,
                unitPrice: 399.9,
            },
            {
                product: "Memória RAM 16GB",
                quantity: 10,
                unitPrice: 289.9,
            },
        ],
        total: 8897.5,
        status: "received",
    },
    {
        id: "PC-2026-004",
        supplier: "Office Supply Brasil",
        date: "22/08/2026",
        items: [
            {
                product: "Mousepad Office",
                quantity: 30,
                unitPrice: 29.9,
            },
        ],
        total: 897,
        status: "draft",
    },
    {
        id: "PC-2026-005",
        supplier: "Digital Solutions",
        date: "20/08/2026",
        items: [
            {
                product: "Webcam Logitech C920",
                quantity: 5,
                unitPrice: 499.9,
            },
        ],
        total: 2499.5,
        status: "cancelled",
    },
];


// ============================================================
// HELPERS
// ============================================================

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function getPurchaseStatus(status: PurchaseStatus) {
    const statusMap: Record<
        PurchaseStatus,
        {
            label: string;
            icon: typeof Clock3;
            className: string;
        }
    > = {
        draft: {
            label: "Rascunho",
            icon: FileText,
            className: "bg-slate-100 text-slate-700 border-slate-200",
        },
        ordered: {
            label: "Pedido realizado",
            icon: ShoppingCart,
            className: "bg-blue-50 text-blue-700 border-blue-200",
        },
        waiting: {
            label: "Aguardando recebimento",
            icon: Truck,
            className: "bg-amber-50 text-amber-700 border-amber-200",
        },
        received: {
            label: "Recebido",
            icon: CheckCircle2,
            className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        cancelled: {
            label: "Cancelado",
            icon: XCircle,
            className: "bg-red-50 text-red-700 border-red-200",
        },
    };

    return statusMap[status];
}

function SupplierStatusBadge({
    status,
}: {
    status: SupplierStatus;
}) {
    if (status === "active") {
        return (
            <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-emerald-700"
            >
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Ativo
            </Badge>
        );
    }

    return (
        <Badge
            variant="outline"
            className="border-slate-200 bg-slate-100 text-slate-600"
        >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
            Inativo
        </Badge>
    );
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: typeof Users;
}) {
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        {description}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5C9EAD]/10">
                    <Icon className="h-5 w-5 text-[#5C9EAD]" />
                </div>
            </CardContent>
        </Card>
    );
}


// ============================================================
// PAGE
// ============================================================

export default function SuppliersPage() {
    const [suppliers, setSuppliers] =
        useState<Supplier[]>(initialSuppliers);

    const [purchaseOrders, setPurchaseOrders] =
        useState<PurchaseOrder[]>(initialPurchaseOrders);

    const [supplierSearch, setSupplierSearch] = useState("");
    const [supplierStatus, setSupplierStatus] = useState("all");

    const [purchaseSearch, setPurchaseSearch] = useState("");
    const [purchaseStatus, setPurchaseStatus] = useState("all");

    const [supplierDialogOpen, setSupplierDialogOpen] =
        useState(false);

    const [purchaseDialogOpen, setPurchaseDialogOpen] =
        useState(false);

    const [viewOrderDialogOpen, setViewOrderDialogOpen] =
        useState(false);

    const [selectedOrder, setSelectedOrder] =
        useState<PurchaseOrder | null>(null);

    const [newSupplierName, setNewSupplierName] = useState("");
    const [newSupplierContact, setNewSupplierContact] = useState("");
    const [newSupplierEmail, setNewSupplierEmail] = useState("");
    const [newSupplierPhone, setNewSupplierPhone] = useState("");
    const [newSupplierCategory, setNewSupplierCategory] =
        useState("Informática");

    const [newPurchaseSupplier, setNewPurchaseSupplier] =
        useState("");

    const [newPurchaseProduct, setNewPurchaseProduct] =
        useState("Mouse Logitech G203");

    const [newPurchaseQuantity, setNewPurchaseQuantity] =
        useState("10");

    const [newPurchasePrice, setNewPurchasePrice] =
        useState("89.90");


    // ========================================================
    // FILTERS
    // ========================================================

    const filteredSuppliers = useMemo(() => {
        return suppliers.filter((supplier) => {
            const search = supplierSearch.toLowerCase();

            const matchesSearch =
                supplier.name.toLowerCase().includes(search) ||
                supplier.contact.toLowerCase().includes(search) ||
                supplier.email.toLowerCase().includes(search);

            const matchesStatus =
                supplierStatus === "all" ||
                supplier.status === supplierStatus;

            return matchesSearch && matchesStatus;
        });
    }, [suppliers, supplierSearch, supplierStatus]);


    const filteredPurchaseOrders = useMemo(() => {
        return purchaseOrders.filter((order) => {
            const search = purchaseSearch.toLowerCase();

            const matchesSearch =
                order.id.toLowerCase().includes(search) ||
                order.supplier.toLowerCase().includes(search);

            const matchesStatus =
                purchaseStatus === "all" ||
                order.status === purchaseStatus;

            return matchesSearch && matchesStatus;
        });
    }, [purchaseOrders, purchaseSearch, purchaseStatus]);


    // ========================================================
    // STATS
    // ========================================================

    const activeSuppliers = suppliers.filter(
        (supplier) => supplier.status === "active"
    ).length;

    const waitingOrders = purchaseOrders.filter(
        (order) =>
            order.status === "waiting" ||
            order.status === "ordered"
    ).length;

    const monthPurchases = purchaseOrders
        .filter((order) => order.status === "received")
        .reduce((total, order) => total + order.total, 0);


    // ========================================================
    // CREATE SUPPLIER
    // ========================================================

    function handleCreateSupplier() {
        if (!newSupplierName.trim()) {
            return;
        }

        const newSupplier: Supplier = {
            id: Date.now(),
            name: newSupplierName,
            contact: newSupplierContact || "Não informado",
            email: newSupplierEmail || "Não informado",
            phone: newSupplierPhone || "Não informado",
            products: 0,
            orders: 0,
            lastPurchase: "-",
            status: "active",
            category: newSupplierCategory,
        };

        setSuppliers((current) => [
            newSupplier,
            ...current,
        ]);

        setNewSupplierName("");
        setNewSupplierContact("");
        setNewSupplierEmail("");
        setNewSupplierPhone("");
        setNewSupplierCategory("Informática");

        setSupplierDialogOpen(false);
    }


    // ========================================================
    // CREATE PURCHASE
    // ========================================================

    function handleCreatePurchase() {
        if (!newPurchaseSupplier) {
            return;
        }

        const quantity = Number(newPurchaseQuantity);
        const price = Number(newPurchasePrice);

        if (
            Number.isNaN(quantity) ||
            Number.isNaN(price) ||
            quantity <= 0 ||
            price <= 0
        ) {
            return;
        }

        const newOrder: PurchaseOrder = {
            id: `PC-2026-${String(
                purchaseOrders.length + 6
            ).padStart(3, "0")}`,
            supplier: newPurchaseSupplier,
            date: new Date().toLocaleDateString("pt-BR"),
            items: [
                {
                    product: newPurchaseProduct,
                    quantity,
                    unitPrice: price,
                },
            ],
            total: quantity * price,
            status: "draft",
        };

        setPurchaseOrders((current) => [
            newOrder,
            ...current,
        ]);

        setNewPurchaseSupplier("");
        setNewPurchaseProduct("Mouse Logitech G203");
        setNewPurchaseQuantity("10");
        setNewPurchasePrice("89.90");

        setPurchaseDialogOpen(false);
    }


    // ========================================================
    // VIEW ORDER
    // ========================================================

    function handleViewOrder(order: PurchaseOrder) {
        setSelectedOrder(order);
        setViewOrderDialogOpen(true);
    }


    // ========================================================
    // RECEIVE ORDER
    // ========================================================

    function handleReceiveOrder(orderId: string) {
        setPurchaseOrders((current) =>
            current.map((order) =>
                order.id === orderId
                    ? {
                        ...order,
                        status: "received",
                    }
                    : order
            )
        );

        if (selectedOrder?.id === orderId) {
            setSelectedOrder({
                ...selectedOrder,
                status: "received",
            });
        }
    }


    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div className="min-h-screen w-full bg-slate-50">
            <SideMenu />
            <Navbar />

            <main className="pt-20 lg:pl-72">
                <div className="flex flex-col gap-6 p-6">

                    {/* HEADER */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Fornecedores
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Gerencie seus fornecedores e pedidos de compra.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="border-slate-200 bg-white"
                                onClick={() =>
                                    setSupplierDialogOpen(true)
                                }
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Novo fornecedor
                            </Button>

                            <Button
                                className="bg-[#5C9EAD] hover:bg-[#4f8d9c]"
                                onClick={() =>
                                    setPurchaseDialogOpen(true)
                                }
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Nova compra
                            </Button>
                        </div>
                    </div>


                    {/* STATS */}
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Fornecedores"
                            value={String(suppliers.length)}
                            description="Cadastrados no sistema"
                            icon={Building2}
                        />

                        <StatCard
                            title="Fornecedores ativos"
                            value={String(activeSuppliers)}
                            description="Disponíveis para compras"
                            icon={Users}
                        />

                        <StatCard
                            title="Pedidos em andamento"
                            value={String(waitingOrders)}
                            description="Aguardando recebimento"
                            icon={Truck}
                        />

                        <StatCard
                            title="Compras recebidas"
                            value={formatCurrency(monthPurchases)}
                            description="Total dos pedidos recebidos"
                            icon={Package}
                        />

                    </div>


                    {/* TABS */}
                    <Tabs defaultValue="suppliers" className="w-full">

                        <TabsList className="mb-4 bg-white">
                            <TabsTrigger value="suppliers">
                                <Building2 className="mr-2 h-4 w-4" />
                                Fornecedores
                            </TabsTrigger>

                            <TabsTrigger value="purchases">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Pedidos de compra
                            </TabsTrigger>
                        </TabsList>


                        {/* ==================================================
                            SUPPLIERS
                        ================================================== */}

                        <TabsContent value="suppliers">

                            <Card className="border-slate-200 shadow-sm">

                                <CardHeader className="border-b border-slate-100">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                        <div>
                                            <CardTitle className="text-lg">
                                                Lista de fornecedores
                                            </CardTitle>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Consulte e gerencie seus parceiros comerciais.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2 sm:flex-row">

                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Input
                                                    placeholder="Buscar fornecedor..."
                                                    value={supplierSearch}
                                                    onChange={(event) =>
                                                        setSupplierSearch(
                                                            event.target.value
                                                        )
                                                    }
                                                    className="w-full pl-9 sm:w-64"
                                                />
                                            </div>

                                            <Select
                                                value={supplierStatus}
                                                onValueChange={setSupplierStatus}
                                            >
                                                <SelectTrigger className="w-full sm:w-40">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        Todos
                                                    </SelectItem>

                                                    <SelectItem value="active">
                                                        Ativos
                                                    </SelectItem>

                                                    <SelectItem value="inactive">
                                                        Inativos
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                        </div>
                                    </div>
                                </CardHeader>


                                <CardContent className="p-0">

                                    <div className="overflow-x-auto">

                                        <Table>

                                            <TableHeader>
                                                <TableRow className="bg-slate-50/70">

                                                    <TableHead>
                                                        Fornecedor
                                                    </TableHead>

                                                    <TableHead>
                                                        Contato
                                                    </TableHead>

                                                    <TableHead>
                                                        Categoria
                                                    </TableHead>

                                                    <TableHead>
                                                        Produtos
                                                    </TableHead>

                                                    <TableHead>
                                                        Pedidos
                                                    </TableHead>

                                                    <TableHead>
                                                        Última compra
                                                    </TableHead>

                                                    <TableHead>
                                                        Status
                                                    </TableHead>

                                                    <TableHead className="text-right">
                                                        Ações
                                                    </TableHead>

                                                </TableRow>
                                            </TableHeader>


                                            <TableBody>

                                                {filteredSuppliers.map(
                                                    (supplier) => (
                                                        <TableRow
                                                            key={supplier.id}
                                                            className="hover:bg-slate-50"
                                                        >

                                                            <TableCell>
                                                                <div className="flex items-center gap-3">

                                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5C9EAD]/10">
                                                                        <Building2 className="h-4 w-4 text-[#5C9EAD]" />
                                                                    </div>

                                                                    <div>
                                                                        <p className="font-medium text-slate-900">
                                                                            {supplier.name}
                                                                        </p>

                                                                        <p className="text-xs text-slate-500">
                                                                            #{String(
                                                                                supplier.id
                                                                            ).padStart(
                                                                                4,
                                                                                "0"
                                                                            )}
                                                                        </p>
                                                                    </div>

                                                                </div>
                                                            </TableCell>


                                                            <TableCell>
                                                                <div>
                                                                    <p className="text-sm font-medium text-slate-700">
                                                                        {supplier.contact}
                                                                    </p>

                                                                    <p className="text-xs text-slate-500">
                                                                        {supplier.email}
                                                                    </p>
                                                                </div>
                                                            </TableCell>


                                                            <TableCell>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="font-normal"
                                                                >
                                                                    {supplier.category}
                                                                </Badge>
                                                            </TableCell>


                                                            <TableCell>
                                                                <span className="font-medium text-slate-700">
                                                                    {supplier.products}
                                                                </span>
                                                            </TableCell>


                                                            <TableCell>
                                                                <span className="font-medium text-slate-700">
                                                                    {supplier.orders}
                                                                </span>
                                                            </TableCell>


                                                            <TableCell>
                                                                <span className="text-sm text-slate-600">
                                                                    {supplier.lastPurchase}
                                                                </span>
                                                            </TableCell>


                                                            <TableCell>
                                                                <SupplierStatusBadge
                                                                    status={
                                                                        supplier.status
                                                                    }
                                                                />
                                                            </TableCell>


                                                            <TableCell className="text-right">

                                                                <div className="flex justify-end gap-1">

                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        title="Editar fornecedor"
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Button>

                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        title="Mais opções"
                                                                    >
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>

                                                                </div>

                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                )}


                                                {filteredSuppliers.length === 0 && (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={8}
                                                            className="h-32 text-center"
                                                        >
                                                            <div className="flex flex-col items-center justify-center gap-2">

                                                                <Building2 className="h-8 w-8 text-slate-300" />

                                                                <p className="text-sm font-medium text-slate-600">
                                                                    Nenhum fornecedor encontrado
                                                                </p>

                                                                <p className="text-xs text-slate-400">
                                                                    Tente alterar os filtros.
                                                                </p>

                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}

                                            </TableBody>

                                        </Table>

                                    </div>


                                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-4">

                                        <p className="text-sm text-slate-500">
                                            Mostrando{" "}
                                            <span className="font-medium text-slate-700">
                                                {filteredSuppliers.length}
                                            </span>{" "}
                                            fornecedores
                                        </p>

                                    </div>

                                </CardContent>

                            </Card>

                        </TabsContent>


                        {/* ==================================================
                            PURCHASE ORDERS
                        ================================================== */}

                        <TabsContent value="purchases">

                            <Card className="border-slate-200 shadow-sm">

                                <CardHeader className="border-b border-slate-100">

                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                        <div>
                                            <CardTitle className="text-lg">
                                                Pedidos de compra
                                            </CardTitle>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Acompanhe suas compras e recebimentos.
                                            </p>
                                        </div>


                                        <div className="flex flex-col gap-2 sm:flex-row">

                                            <div className="relative">

                                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Input
                                                    placeholder="Buscar pedido..."
                                                    value={purchaseSearch}
                                                    onChange={(event) =>
                                                        setPurchaseSearch(
                                                            event.target.value
                                                        )
                                                    }
                                                    className="w-full pl-9 sm:w-64"
                                                />

                                            </div>


                                            <Select
                                                value={purchaseStatus}
                                                onValueChange={setPurchaseStatus}
                                            >

                                                <SelectTrigger className="w-full sm:w-48">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>

                                                <SelectContent>

                                                    <SelectItem value="all">
                                                        Todos
                                                    </SelectItem>

                                                    <SelectItem value="draft">
                                                        Rascunho
                                                    </SelectItem>

                                                    <SelectItem value="ordered">
                                                        Pedido realizado
                                                    </SelectItem>

                                                    <SelectItem value="waiting">
                                                        Aguardando recebimento
                                                    </SelectItem>

                                                    <SelectItem value="received">
                                                        Recebidos
                                                    </SelectItem>

                                                    <SelectItem value="cancelled">
                                                        Cancelados
                                                    </SelectItem>

                                                </SelectContent>

                                            </Select>

                                        </div>

                                    </div>

                                </CardHeader>


                                <CardContent className="p-0">

                                    <div className="overflow-x-auto">

                                        <Table>

                                            <TableHeader>

                                                <TableRow className="bg-slate-50/70">

                                                    <TableHead>
                                                        Pedido
                                                    </TableHead>

                                                    <TableHead>
                                                        Fornecedor
                                                    </TableHead>

                                                    <TableHead>
                                                        Data
                                                    </TableHead>

                                                    <TableHead>
                                                        Itens
                                                    </TableHead>

                                                    <TableHead>
                                                        Total
                                                    </TableHead>

                                                    <TableHead>
                                                        Status
                                                    </TableHead>

                                                    <TableHead className="text-right">
                                                        Ações
                                                    </TableHead>

                                                </TableRow>

                                            </TableHeader>


                                            <TableBody>

                                                {filteredPurchaseOrders.map(
                                                    (order) => {

                                                        const status =
                                                            getPurchaseStatus(
                                                                order.status
                                                            );

                                                        const StatusIcon =
                                                            status.icon;

                                                        const totalItems =
                                                            order.items.reduce(
                                                                (
                                                                    total,
                                                                    item
                                                                ) =>
                                                                    total +
                                                                    item.quantity,
                                                                0
                                                            );

                                                        return (
                                                            <TableRow
                                                                key={order.id}
                                                                className="hover:bg-slate-50"
                                                            >

                                                                <TableCell>

                                                                    <div className="flex items-center gap-3">

                                                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                                                                            <FileText className="h-4 w-4 text-slate-600" />
                                                                        </div>

                                                                        <span className="font-semibold text-slate-900">
                                                                            {order.id}
                                                                        </span>

                                                                    </div>

                                                                </TableCell>


                                                                <TableCell>
                                                                    <span className="font-medium text-slate-700">
                                                                        {order.supplier}
                                                                    </span>
                                                                </TableCell>


                                                                <TableCell>
                                                                    <span className="text-sm text-slate-600">
                                                                        {order.date}
                                                                    </span>
                                                                </TableCell>


                                                                <TableCell>
                                                                    <span className="text-sm font-medium text-slate-700">
                                                                        {totalItems}{" "}
                                                                        un.
                                                                    </span>
                                                                </TableCell>


                                                                <TableCell>
                                                                    <span className="font-semibold text-slate-900">
                                                                        {formatCurrency(
                                                                            order.total
                                                                        )}
                                                                    </span>
                                                                </TableCell>


                                                                <TableCell>

                                                                    <Badge
                                                                        variant="outline"
                                                                        className={
                                                                            status.className
                                                                        }
                                                                    >
                                                                        <StatusIcon className="mr-1.5 h-3.5 w-3.5" />

                                                                        {
                                                                            status.label
                                                                        }
                                                                    </Badge>

                                                                </TableCell>


                                                                <TableCell>

                                                                    <div className="flex justify-end gap-1">

                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            title="Visualizar pedido"
                                                                            onClick={() =>
                                                                                handleViewOrder(
                                                                                    order
                                                                                )
                                                                            }
                                                                        >
                                                                            <Eye className="h-4 w-4" />
                                                                        </Button>


                                                                        {(order.status ===
                                                                            "waiting" ||
                                                                            order.status ===
                                                                            "ordered") && (
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    title="Receber pedido"
                                                                                    className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                                                                                    onClick={() =>
                                                                                        handleReceiveOrder(
                                                                                            order.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <CheckCircle2 className="h-4 w-4" />
                                                                                </Button>
                                                                            )}

                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            title="Mais opções"
                                                                        >
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                        </Button>

                                                                    </div>

                                                                </TableCell>

                                                            </TableRow>
                                                        );
                                                    }
                                                )}


                                                {filteredPurchaseOrders.length ===
                                                    0 && (
                                                        <TableRow>

                                                            <TableCell
                                                                colSpan={7}
                                                                className="h-32 text-center"
                                                            >

                                                                <div className="flex flex-col items-center justify-center gap-2">

                                                                    <ShoppingCart className="h-8 w-8 text-slate-300" />

                                                                    <p className="text-sm font-medium text-slate-600">
                                                                        Nenhum pedido encontrado
                                                                    </p>

                                                                    <p className="text-xs text-slate-400">
                                                                        Tente alterar os filtros.
                                                                    </p>

                                                                </div>

                                                            </TableCell>

                                                        </TableRow>
                                                    )}

                                            </TableBody>

                                        </Table>

                                    </div>


                                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-4">

                                        <p className="text-sm text-slate-500">
                                            Mostrando{" "}
                                            <span className="font-medium text-slate-700">
                                                {
                                                    filteredPurchaseOrders.length
                                                }
                                            </span>{" "}
                                            pedidos
                                        </p>

                                    </div>

                                </CardContent>

                            </Card>

                        </TabsContent>

                    </Tabs>

                </div>
            </main>


            {/* ============================================================
                NEW SUPPLIER DIALOG
            ============================================================ */}

            <Dialog
                open={supplierDialogOpen}
                onOpenChange={setSupplierDialogOpen}
            >

                <DialogContent className="sm:max-w-lg">

                    <DialogHeader>

                        <DialogTitle>
                            Novo fornecedor
                        </DialogTitle>

                        <DialogDescription>
                            Cadastre um novo fornecedor para realizar compras.
                        </DialogDescription>

                    </DialogHeader>


                    <div className="grid gap-4 py-4">

                        <div className="grid gap-2">

                            <Label htmlFor="supplier-name">
                                Nome da empresa
                            </Label>

                            <Input
                                id="supplier-name"
                                placeholder="Ex: Tech Distribuidora"
                                value={newSupplierName}
                                onChange={(event) =>
                                    setNewSupplierName(
                                        event.target.value
                                    )
                                }
                            />

                        </div>


                        <div className="grid gap-2">

                            <Label htmlFor="supplier-contact">
                                Responsável
                            </Label>

                            <Input
                                id="supplier-contact"
                                placeholder="Nome do responsável"
                                value={newSupplierContact}
                                onChange={(event) =>
                                    setNewSupplierContact(
                                        event.target.value
                                    )
                                }
                            />

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            <div className="grid gap-2">

                                <Label htmlFor="supplier-email">
                                    E-mail
                                </Label>

                                <Input
                                    id="supplier-email"
                                    type="email"
                                    placeholder="email@empresa.com"
                                    value={newSupplierEmail}
                                    onChange={(event) =>
                                        setNewSupplierEmail(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="grid gap-2">

                                <Label htmlFor="supplier-phone">
                                    Telefone
                                </Label>

                                <Input
                                    id="supplier-phone"
                                    placeholder="(00) 00000-0000"
                                    value={newSupplierPhone}
                                    onChange={(event) =>
                                        setNewSupplierPhone(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        <div className="grid gap-2">

                            <Label>
                                Categoria
                            </Label>

                            <Select
                                value={newSupplierCategory}
                                onValueChange={
                                    setNewSupplierCategory
                                }
                            >

                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="Informática">
                                        Informática
                                    </SelectItem>

                                    <SelectItem value="Eletrônicos">
                                        Eletrônicos
                                    </SelectItem>

                                    <SelectItem value="Hardware">
                                        Hardware
                                    </SelectItem>

                                    <SelectItem value="Tecnologia">
                                        Tecnologia
                                    </SelectItem>

                                    <SelectItem value="Escritório">
                                        Escritório
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                    </div>


                    <DialogFooter>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setSupplierDialogOpen(false)
                            }
                        >
                            Cancelar
                        </Button>

                        <Button
                            className="bg-[#5C9EAD] hover:bg-[#4f8d9c]"
                            onClick={handleCreateSupplier}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Cadastrar fornecedor
                        </Button>

                    </DialogFooter>

                </DialogContent>

            </Dialog>


            {/* ============================================================
                NEW PURCHASE DIALOG
            ============================================================ */}

            <Dialog
                open={purchaseDialogOpen}
                onOpenChange={setPurchaseDialogOpen}
            >

                <DialogContent className="sm:max-w-lg">

                    <DialogHeader>

                        <DialogTitle>
                            Nova compra
                        </DialogTitle>

                        <DialogDescription>
                            Crie um novo pedido de compra para um fornecedor.
                        </DialogDescription>

                    </DialogHeader>


                    <div className="grid gap-4 py-4">

                        <div className="grid gap-2">

                            <Label>
                                Fornecedor
                            </Label>

                            <Select
                                value={newPurchaseSupplier}
                                onValueChange={
                                    setNewPurchaseSupplier
                                }
                            >

                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um fornecedor" />
                                </SelectTrigger>

                                <SelectContent>

                                    {suppliers
                                        .filter(
                                            (supplier) =>
                                                supplier.status ===
                                                "active"
                                        )
                                        .map((supplier) => (
                                            <SelectItem
                                                key={supplier.id}
                                                value={supplier.name}
                                            >
                                                {supplier.name}
                                            </SelectItem>
                                        ))}

                                </SelectContent>

                            </Select>

                        </div>


                        <div className="grid gap-2">

                            <Label>
                                Produto
                            </Label>

                            <Select
                                value={newPurchaseProduct}
                                onValueChange={
                                    setNewPurchaseProduct
                                }
                            >

                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="Mouse Logitech G203">
                                        Mouse Logitech G203
                                    </SelectItem>

                                    <SelectItem value="Teclado Mecânico RGB">
                                        Teclado Mecânico RGB
                                    </SelectItem>

                                    <SelectItem value="Monitor AOC 24">
                                        Monitor AOC 24
                                    </SelectItem>

                                    <SelectItem value="SSD Kingston 1TB">
                                        SSD Kingston 1TB
                                    </SelectItem>

                                    <SelectItem value="Memória RAM 16GB">
                                        Memória RAM 16GB
                                    </SelectItem>

                                    <SelectItem value="Webcam Logitech C920">
                                        Webcam Logitech C920
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            <div className="grid gap-2">

                                <Label htmlFor="purchase-quantity">
                                    Quantidade
                                </Label>

                                <Input
                                    id="purchase-quantity"
                                    type="number"
                                    min="1"
                                    value={newPurchaseQuantity}
                                    onChange={(event) =>
                                        setNewPurchaseQuantity(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="grid gap-2">

                                <Label htmlFor="purchase-price">
                                    Preço unitário
                                </Label>

                                <Input
                                    id="purchase-price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={newPurchasePrice}
                                    onChange={(event) =>
                                        setNewPurchasePrice(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                            <div className="flex items-center justify-between">

                                <span className="text-sm text-slate-500">
                                    Total estimado
                                </span>

                                <span className="text-lg font-bold text-slate-900">
                                    {formatCurrency(
                                        (Number(
                                            newPurchaseQuantity
                                        ) || 0) *
                                        (Number(
                                            newPurchasePrice
                                        ) || 0)
                                    )}
                                </span>

                            </div>

                        </div>

                    </div>


                    <DialogFooter>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setPurchaseDialogOpen(false)
                            }
                        >
                            Cancelar
                        </Button>

                        <Button
                            className="bg-[#5C9EAD] hover:bg-[#4f8d9c]"
                            onClick={handleCreatePurchase}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Criar pedido
                        </Button>

                    </DialogFooter>

                </DialogContent>

            </Dialog>


            {/* ============================================================
                VIEW PURCHASE ORDER DIALOG
            ============================================================ */}

            <Dialog
                open={viewOrderDialogOpen}
                onOpenChange={setViewOrderDialogOpen}
            >

                <DialogContent className="sm:max-w-2xl">

                    {selectedOrder && (
                        <>
                            <DialogHeader>

                                <div className="flex items-center justify-between pr-6">

                                    <div>

                                        <DialogTitle>
                                            {selectedOrder.id}
                                        </DialogTitle>

                                        <DialogDescription>
                                            Pedido realizado em{" "}
                                            {selectedOrder.date}
                                        </DialogDescription>

                                    </div>

                                </div>

                            </DialogHeader>


                            <div className="space-y-5">

                                <div className="grid gap-4 sm:grid-cols-3">

                                    <div className="rounded-lg border border-slate-200 p-4">

                                        <p className="text-xs text-slate-500">
                                            Fornecedor
                                        </p>

                                        <p className="mt-1 font-semibold text-slate-900">
                                            {selectedOrder.supplier}
                                        </p>

                                    </div>


                                    <div className="rounded-lg border border-slate-200 p-4">

                                        <p className="text-xs text-slate-500">
                                            Itens
                                        </p>

                                        <p className="mt-1 font-semibold text-slate-900">
                                            {selectedOrder.items.reduce(
                                                (
                                                    total,
                                                    item
                                                ) =>
                                                    total +
                                                    item.quantity,
                                                0
                                            )}{" "}
                                            unidades
                                        </p>

                                    </div>


                                    <div className="rounded-lg border border-slate-200 p-4">

                                        <p className="text-xs text-slate-500">
                                            Status
                                        </p>

                                        <div className="mt-2">

                                            <Badge
                                                variant="outline"
                                                className={
                                                    getPurchaseStatus(
                                                        selectedOrder.status
                                                    ).className
                                                }
                                            >
                                                {
                                                    getPurchaseStatus(
                                                        selectedOrder.status
                                                    ).label
                                                }
                                            </Badge>

                                        </div>

                                    </div>

                                </div>


                                <div>

                                    <h3 className="mb-3 text-sm font-semibold text-slate-900">
                                        Produtos do pedido
                                    </h3>

                                    <div className="overflow-hidden rounded-lg border border-slate-200">

                                        <Table>

                                            <TableHeader>

                                                <TableRow className="bg-slate-50">

                                                    <TableHead>
                                                        Produto
                                                    </TableHead>

                                                    <TableHead>
                                                        Quantidade
                                                    </TableHead>

                                                    <TableHead>
                                                        Unitário
                                                    </TableHead>

                                                    <TableHead className="text-right">
                                                        Total
                                                    </TableHead>

                                                </TableRow>

                                            </TableHeader>


                                            <TableBody>

                                                {selectedOrder.items.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (
                                                        <TableRow
                                                            key={`${item.product}-${index}`}
                                                        >

                                                            <TableCell className="font-medium">
                                                                {item.product}
                                                            </TableCell>

                                                            <TableCell>
                                                                {item.quantity}
                                                            </TableCell>

                                                            <TableCell>
                                                                {formatCurrency(
                                                                    item.unitPrice
                                                                )}
                                                            </TableCell>

                                                            <TableCell className="text-right font-semibold">
                                                                {formatCurrency(
                                                                    item.quantity *
                                                                    item.unitPrice
                                                                )}
                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                )}

                                            </TableBody>

                                        </Table>

                                    </div>

                                </div>


                                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">

                                    <span className="font-medium text-slate-600">
                                        Total do pedido
                                    </span>

                                    <span className="text-xl font-bold text-slate-900">
                                        {formatCurrency(
                                            selectedOrder.total
                                        )}
                                    </span>

                                </div>

                            </div>


                            <DialogFooter>

                                {(selectedOrder.status ===
                                    "waiting" ||
                                    selectedOrder.status ===
                                    "ordered") && (
                                        <Button
                                            className="bg-emerald-600 hover:bg-emerald-700"
                                            onClick={() =>
                                                handleReceiveOrder(
                                                    selectedOrder.id
                                                )
                                            }
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Receber pedido
                                        </Button>
                                    )}

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setViewOrderDialogOpen(false)
                                    }
                                >
                                    Fechar
                                </Button>

                            </DialogFooter>

                        </>
                    )}

                </DialogContent>

            </Dialog>

        </div>
    );
}