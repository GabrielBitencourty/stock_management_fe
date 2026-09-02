"use client";

import { useMemo, useState } from "react";

import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";

import {
    ArrowDownToLine,
    ArrowUpFromLine,
    Boxes,
    DollarSign,
    MoreHorizontal,
    Package,
    Search,
    AlertTriangle,
    Plus,
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

type StockStatus = "available" | "low" | "out";

type Product = {
    id: number;
    name: string;
    sku: string;
    category: string;
    stock: number;
    minimumStock: number;
    price: number;
};


// ==========================================
// MOCK DATA
// ==========================================

const initialProducts: Product[] = [
    {
        id: 1,
        name: "Notebook Dell Inspiron",
        sku: "NB001",
        category: "Eletrônicos",
        stock: 42,
        minimumStock: 10,
        price: 4299.9,
    },
    {
        id: 2,
        name: "Mouse Logitech G203",
        sku: "MS002",
        category: "Periféricos",
        stock: 3,
        minimumStock: 10,
        price: 149.9,
    },
    {
        id: 3,
        name: "Teclado Mecânico RGB",
        sku: "TC003",
        category: "Periféricos",
        stock: 0,
        minimumStock: 5,
        price: 299.9,
    },
    {
        id: 4,
        name: "Monitor AOC 24",
        sku: "MN004",
        category: "Monitores",
        stock: 18,
        minimumStock: 5,
        price: 899.9,
    },
    {
        id: 5,
        name: "Headset HyperX Cloud",
        sku: "HS005",
        category: "Áudio",
        stock: 7,
        minimumStock: 8,
        price: 449.9,
    },
    {
        id: 6,
        name: "Webcam Logitech C920",
        sku: "WC006",
        category: "Periféricos",
        stock: 15,
        minimumStock: 5,
        price: 499.9,
    },
    {
        id: 7,
        name: "SSD Kingston 1TB",
        sku: "SD007",
        category: "Armazenamento",
        stock: 24,
        minimumStock: 8,
        price: 529.9,
    },
    {
        id: 8,
        name: "Memória RAM 16GB",
        sku: "RM008",
        category: "Hardware",
        stock: 4,
        minimumStock: 8,
        price: 379.9,
    },
];


// ==========================================
// HELPERS
// ==========================================

function getStockStatus(
    stock: number,
    minimumStock: number
): StockStatus {

    if (stock === 0) {
        return "out";
    }

    if (stock <= minimumStock) {
        return "low";
    }

    return "available";
}


function formatCurrency(value: number) {

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

}


// ==========================================
// STATUS BADGE
// ==========================================

function StockStatusBadge({
    stock,
    minimumStock,
}: {
    stock: number;
    minimumStock: number;
}) {

    const status = getStockStatus(stock, minimumStock);


    if (status === "out") {

        return (
            <Badge
                variant="destructive"
                className="gap-1"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Sem estoque
            </Badge>
        );

    }


    if (status === "low") {

        return (
            <Badge
                variant="secondary"
                className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Estoque baixo
            </Badge>
        );

    }


    return (
        <Badge
            variant="secondary"
            className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
        >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Disponível
        </Badge>
    );
}


// ==========================================
// STAT CARD
// ==========================================

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconClassName,
}: {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    iconClassName?: string;
}) {

    return (
        <Card className="border-slate-200 shadow-sm">

            <CardContent className="p-6">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-sm font-medium text-slate-500">
                            {title}
                        </p>

                        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            {value}
                        </p>

                    </div>

                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-[#5C9EAD]/10 ${iconClassName ?? ""}`}
                    >
                        <Icon className="h-5 w-5 text-[#5C9EAD]" />
                    </div>

                </div>

                <p className="mt-3 text-xs text-slate-400">
                    {description}
                </p>

            </CardContent>

        </Card>
    );
}


// ==========================================
// MOVEMENT DIALOG
// ==========================================

function StockMovementDialog({
    product,
    onMovement,
}: {
    product: Product;
    onMovement: (
        productId: number,
        type: "entry" | "exit",
        quantity: number
    ) => void;
}) {

    const [type, setType] = useState<"entry" | "exit">("entry");

    const [quantity, setQuantity] = useState("");


    function handleSubmit() {

        const parsedQuantity = Number(quantity);

        if (!parsedQuantity || parsedQuantity <= 0) {
            return;
        }

        if (
            type === "exit" &&
            parsedQuantity > product.stock
        ) {
            return;
        }

        onMovement(
            product.id,
            type,
            parsedQuantity
        );

        setQuantity("");
    }


    return (
        <Dialog>

            <DialogTrigger asChild>

                <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Movimentar
                </Button>

            </DialogTrigger>


            <DialogContent className="sm:max-w-[450px]">

                <DialogHeader>

                    <DialogTitle>
                        Movimentar estoque
                    </DialogTitle>

                    <DialogDescription>
                        Registre uma entrada ou saída para este produto.
                    </DialogDescription>

                </DialogHeader>


                <div className="space-y-5 py-4">


                    {/* PRODUTO */}

                    <div className="rounded-lg bg-slate-50 p-4">

                        <p className="text-sm font-medium text-slate-900">
                            {product.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            SKU: {product.sku}
                        </p>

                        <p className="mt-3 text-sm text-slate-600">

                            Estoque atual:

                            <span className="ml-1 font-semibold text-slate-900">
                                {product.stock} unidades
                            </span>

                        </p>

                    </div>


                    {/* TIPO */}

                    <div className="space-y-2">

                        <Label>
                            Tipo de movimentação
                        </Label>

                        <Select
                            value={type}
                            onValueChange={(value) =>
                                setType(value as "entry" | "exit")
                            }
                        >

                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="entry">
                                    Entrada
                                </SelectItem>

                                <SelectItem value="exit">
                                    Saída
                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>


                    {/* QUANTIDADE */}

                    <div className="space-y-2">

                        <Label htmlFor="quantity">
                            Quantidade
                        </Label>

                        <Input
                            id="quantity"
                            type="number"
                            min="1"
                            placeholder="Ex: 10"
                            value={quantity}
                            onChange={(event) =>
                                setQuantity(event.target.value)
                            }
                        />

                    </div>

                </div>


                <DialogFooter>

                    <Button
                        onClick={handleSubmit}
                        className="bg-[#5C9EAD] hover:bg-[#4f8d9b]"
                    >
                        Confirmar movimentação
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}


// ==========================================
// PAGE
// ==========================================

export default function StockPage() {

    const [products, setProducts] =
        useState<Product[]>(initialProducts);

    const [search, setSearch] = useState("");

    const [category, setCategory] =
        useState("all");

    const [status, setStatus] =
        useState("all");


    // ======================================
    // FILTER
    // ======================================

    const filteredProducts = useMemo(() => {

        return products.filter((product) => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                product.sku
                    .toLowerCase()
                    .includes(search.toLowerCase());


            const matchesCategory =
                category === "all" ||
                product.category === category;


            const productStatus =
                getStockStatus(
                    product.stock,
                    product.minimumStock
                );


            const matchesStatus =
                status === "all" ||
                productStatus === status;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );

        });

    }, [products, search, category, status]);


    // ======================================
    // STATS
    // ======================================

    const totalItems = products.reduce(
        (total, product) =>
            total + product.stock,
        0
    );


    const lowStock = products.filter(
        (product) =>
            getStockStatus(
                product.stock,
                product.minimumStock
            ) === "low"
    ).length;


    const outOfStock = products.filter(
        (product) =>
            product.stock === 0
    ).length;


    const stockValue = products.reduce(
        (total, product) =>
            total +
            product.stock * product.price,
        0
    );


    // ======================================
    // MOVEMENT
    // ======================================

    function handleMovement(
        productId: number,
        type: "entry" | "exit",
        quantity: number
    ) {

        setProducts((currentProducts) =>

            currentProducts.map((product) => {

                if (product.id !== productId) {
                    return product;
                }


                const newStock =
                    type === "entry"
                        ? product.stock + quantity
                        : product.stock - quantity;


                return {
                    ...product,
                    stock: Math.max(0, newStock),
                };

            })

        );

    }


    // ======================================
    // RENDER
    // ======================================

    return (

        <div className="min-h-screen w-full bg-slate-50">

            <SideMenu />

            <Navbar />


            <main className="pt-20 lg:pl-72">

                <div className="flex flex-col gap-6 p-6">


                    {/* ================================= */}
                    {/* HEADER */}
                    {/* ================================= */}

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Estoque
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Controle e acompanhe o estoque dos seus produtos.
                            </p>

                        </div>


                        <Button
                            className="w-fit bg-[#5C9EAD] hover:bg-[#4f8d9b]"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Movimentar estoque
                        </Button>

                    </div>


                    {/* ================================= */}
                    {/* ALERT */}
                    {/* ================================= */}

                    {lowStock + outOfStock > 0 && (

                        <Card className="border-amber-200 bg-amber-50">

                            <CardContent className="flex items-center gap-3 p-4">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">

                                    <AlertTriangle className="h-5 w-5 text-amber-600" />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-amber-900">
                                        Atenção ao estoque
                                    </p>

                                    <p className="text-xs text-amber-700">

                                        Você possui{" "}
                                        <strong>
                                            {lowStock}
                                        </strong>{" "}
                                        produto(s) com estoque baixo e{" "}
                                        <strong>
                                            {outOfStock}
                                        </strong>{" "}
                                        sem estoque.

                                    </p>

                                </div>

                            </CardContent>

                        </Card>

                    )}


                    {/* ================================= */}
                    {/* STATS */}
                    {/* ================================= */}

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Total de itens"
                            value={totalItems.toLocaleString("pt-BR")}
                            description="Unidades disponíveis no estoque"
                            icon={Boxes}
                        />

                        <StatCard
                            title="Estoque baixo"
                            value={lowStock.toString()}
                            description="Produtos abaixo do mínimo"
                            icon={AlertTriangle}
                        />

                        <StatCard
                            title="Sem estoque"
                            value={outOfStock.toString()}
                            description="Produtos sem nenhuma unidade"
                            icon={Package}
                        />

                        <StatCard
                            title="Valor em estoque"
                            value={formatCurrency(stockValue)}
                            description="Valor estimado dos produtos"
                            icon={DollarSign}
                        />

                    </div>


                    {/* ================================= */}
                    {/* TABLE CARD */}
                    {/* ================================= */}

                    <Card className="border-slate-200 shadow-sm">


                        {/* HEADER */}

                        <CardHeader>

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                <div>

                                    <CardTitle>
                                        Produtos em estoque
                                    </CardTitle>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Gerencie as quantidades e movimentações.
                                    </p>

                                </div>


                                {/* FILTERS */}

                                <div className="flex flex-col gap-2 sm:flex-row">


                                    {/* SEARCH */}

                                    <div className="relative">

                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <Input
                                            placeholder="Buscar produto..."
                                            className="w-full pl-9 sm:w-[220px]"
                                            value={search}
                                            onChange={(event) =>
                                                setSearch(event.target.value)
                                            }
                                        />

                                    </div>


                                    {/* CATEGORY */}

                                    <Select
                                        value={category}
                                        onValueChange={setCategory}
                                    >

                                        <SelectTrigger className="w-full sm:w-[160px]">

                                            <SelectValue placeholder="Categoria" />

                                        </SelectTrigger>

                                        <SelectContent>

                                            <SelectItem value="all">
                                                Todas categorias
                                            </SelectItem>

                                            <SelectItem value="Eletrônicos">
                                                Eletrônicos
                                            </SelectItem>

                                            <SelectItem value="Periféricos">
                                                Periféricos
                                            </SelectItem>

                                            <SelectItem value="Monitores">
                                                Monitores
                                            </SelectItem>

                                            <SelectItem value="Áudio">
                                                Áudio
                                            </SelectItem>

                                            <SelectItem value="Armazenamento">
                                                Armazenamento
                                            </SelectItem>

                                            <SelectItem value="Hardware">
                                                Hardware
                                            </SelectItem>

                                        </SelectContent>

                                    </Select>


                                    {/* STATUS */}

                                    <Select
                                        value={status}
                                        onValueChange={setStatus}
                                    >

                                        <SelectTrigger className="w-full sm:w-[150px]">

                                            <SelectValue placeholder="Status" />

                                        </SelectTrigger>

                                        <SelectContent>

                                            <SelectItem value="all">
                                                Todos
                                            </SelectItem>

                                            <SelectItem value="available">
                                                Disponível
                                            </SelectItem>

                                            <SelectItem value="low">
                                                Estoque baixo
                                            </SelectItem>

                                            <SelectItem value="out">
                                                Sem estoque
                                            </SelectItem>

                                        </SelectContent>

                                    </Select>

                                </div>

                            </div>

                        </CardHeader>


                        {/* TABLE */}

                        <CardContent className="p-0">

                            <div className="overflow-x-auto">

                                <Table>

                                    <TableHeader>

                                        <TableRow>

                                            <TableHead className="pl-6">
                                                Produto
                                            </TableHead>

                                            <TableHead>
                                                SKU
                                            </TableHead>

                                            <TableHead>
                                                Categoria
                                            </TableHead>

                                            <TableHead>
                                                Estoque
                                            </TableHead>

                                            <TableHead>
                                                Mínimo
                                            </TableHead>

                                            <TableHead>
                                                Status
                                            </TableHead>

                                            <TableHead className="text-right pr-6">
                                                Ações
                                            </TableHead>

                                        </TableRow>

                                    </TableHeader>


                                    <TableBody>

                                        {filteredProducts.length === 0 ? (

                                            <TableRow>

                                                <TableCell
                                                    colSpan={7}
                                                    className="h-32 text-center"
                                                >

                                                    <div className="flex flex-col items-center justify-center">

                                                        <Package className="h-8 w-8 text-slate-300" />

                                                        <p className="mt-2 text-sm font-medium text-slate-600">
                                                            Nenhum produto encontrado
                                                        </p>

                                                        <p className="text-xs text-slate-400">
                                                            Tente alterar os filtros.
                                                        </p>

                                                    </div>

                                                </TableCell>

                                            </TableRow>

                                        ) : (

                                            filteredProducts.map((product) => (

                                                <TableRow
                                                    key={product.id}
                                                    className="hover:bg-slate-50"
                                                >


                                                    {/* PRODUTO */}

                                                    <TableCell className="pl-6">

                                                        <div className="flex items-center gap-3">

                                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5C9EAD]/10">

                                                                <Package className="h-4 w-4 text-[#5C9EAD]" />

                                                            </div>

                                                            <div>

                                                                <p className="font-medium text-slate-900">
                                                                    {product.name}
                                                                </p>

                                                                <p className="text-xs text-slate-400">
                                                                    {formatCurrency(product.price)}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </TableCell>


                                                    {/* SKU */}

                                                    <TableCell className="font-mono text-xs text-slate-500">
                                                        {product.sku}
                                                    </TableCell>


                                                    {/* CATEGORY */}

                                                    <TableCell>

                                                        <span className="text-sm text-slate-600">
                                                            {product.category}
                                                        </span>

                                                    </TableCell>


                                                    {/* STOCK */}

                                                    <TableCell>

                                                        <div className="flex items-center gap-2">

                                                            <span className="font-semibold text-slate-900">
                                                                {product.stock}
                                                            </span>

                                                            <span className="text-xs text-slate-400">
                                                                un.
                                                            </span>

                                                        </div>

                                                    </TableCell>


                                                    {/* MINIMUM */}

                                                    <TableCell className="text-slate-500">
                                                        {product.minimumStock}
                                                    </TableCell>


                                                    {/* STATUS */}

                                                    <TableCell>

                                                        <StockStatusBadge
                                                            stock={product.stock}
                                                            minimumStock={product.minimumStock}
                                                        />

                                                    </TableCell>


                                                    {/* ACTIONS */}

                                                    <TableCell className="pr-6">

                                                        <div className="flex items-center justify-end gap-2">

                                                            <StockMovementDialog
                                                                product={product}
                                                                onMovement={handleMovement}
                                                            />

                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>

                                                        </div>

                                                    </TableCell>

                                                </TableRow>

                                            ))

                                        )}

                                    </TableBody>

                                </Table>

                            </div>


                            {/* FOOTER */}

                            <div className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-sm text-slate-500">

                                    Mostrando{" "}

                                    <span className="font-medium text-slate-700">
                                        {filteredProducts.length}
                                    </span>{" "}

                                    de{" "}

                                    <span className="font-medium text-slate-700">
                                        {products.length}
                                    </span>{" "}

                                    produtos

                                </p>


                                <div className="flex items-center gap-2">

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                    >
                                        Anterior
                                    </Button>

                                    <Button
                                        size="sm"
                                        className="bg-[#5C9EAD] hover:bg-[#4f8d9b]"
                                    >
                                        1
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                    >
                                        Próxima
                                    </Button>

                                </div>

                            </div>

                        </CardContent>

                    </Card>


                    {/* ================================= */}
                    {/* QUICK MOVEMENTS */}
                    {/* ================================= */}

                    <div className="grid gap-4 md:grid-cols-2">


                        <Card className="border-slate-200 shadow-sm">

                            <CardContent className="flex items-center gap-4 p-5">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">

                                    <ArrowDownToLine className="h-5 w-5 text-emerald-600" />

                                </div>

                                <div>

                                    <p className="font-semibold text-slate-900">
                                        Entrada de estoque
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Registre produtos recebidos de fornecedores.
                                    </p>

                                </div>

                            </CardContent>

                        </Card>


                        <Card className="border-slate-200 shadow-sm">

                            <CardContent className="flex items-center gap-4 p-5">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">

                                    <ArrowUpFromLine className="h-5 w-5 text-orange-600" />

                                </div>

                                <div>

                                    <p className="font-semibold text-slate-900">
                                        Saída de estoque
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Registre perdas, ajustes ou retiradas.
                                    </p>

                                </div>

                            </CardContent>

                        </Card>

                    </div>

                </div>

            </main>

        </div>
    );
}