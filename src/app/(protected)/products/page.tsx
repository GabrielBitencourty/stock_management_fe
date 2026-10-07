"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";

import {
    Search,
    Plus,
    Package,
    MoreVertical,
    X,
    Loader2,
    Pencil,
    Trash2,
    AlertTriangle,
} from "lucide-react";

import { toast } from "sonner";

interface Product {
    _id: string;
    productName: string;
    productId: string;
    productDescription: string;
    productPrice: number;
    productCost: number;
    productStock: number;
    productCategory: string;
    productBrand: string;
    productImage: string;
    productBatch: string;
    productSupplier: string;
}

interface ProductsResponse {
    requestTime: string;
    status: string;
    version: string;
    Products: Product[];
}

interface ProductForm {
    productName: string;
    productId: string;
    productDescription: string;
    productPrice: string;
    productCost: string;
    productStock: string;
    productCategory: string;
    productBrand: string;
    productImage: string;
    productBatch: string;
    productSupplier: string;
}

const initialForm: ProductForm = {
    productName: "",
    productId: "",
    productDescription: "",
    productPrice: "",
    productCost: "",
    productStock: "",
    productCategory: "",
    productBrand: "",
    productImage: "",
    productBatch: "",
    productSupplier: "",
};

type ModalMode = "create" | "edit";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>("create");

    const [isSaving, setIsSaving] = useState(false);

    const [form, setForm] = useState<ProductForm>(initialForm);

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [openMenuProductId, setOpenMenuProductId] =
        useState<string | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();

            if (!token) {
                throw new Error(
                    "Token de autenticação não encontrado."
                );
            }

            if (!API_URL) {
                throw new Error(
                    "URL da API não configurada."
                );
            }

            const response = await fetch(`${API_URL}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data: ProductsResponse | null =
                await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.status ||
                        `Erro ao buscar produtos. Status: ${response.status}`
                );
            }

            setProducts(data?.Products ?? []);
        } catch (error) {
            console.error(
                "Erro ao buscar produtos:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Não foi possível carregar os produtos."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        if (!normalizedSearch) {
            return products;
        }

        return products.filter((product) => {
            return (
                product.productName
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                product.productId
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                product.productCategory
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                product.productBrand
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                product._id
                    ?.toLowerCase()
                    .includes(normalizedSearch)
            );
        });
    }, [products, search]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    const getProductStatus = (stock: number) => {
        if (stock === 0) {
            return {
                label: "Sem estoque",
                className:
                    "bg-red-50 text-red-600 border-red-100",
            };
        }

        if (stock <= 5) {
            return {
                label: "Estoque baixo",
                className:
                    "bg-amber-50 text-amber-600 border-amber-100",
            };
        }

        return {
            label: "Ativo",
            className:
                "bg-emerald-50 text-emerald-600 border-emerald-100",
        };
    };

    const handleFormChange = (
        field: keyof ProductForm,
        value: string
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const openCreateModal = () => {
        setModalMode("create");
        setSelectedProduct(null);
        setForm(initialForm);
        setIsProductModalOpen(true);
        setOpenMenuProductId(null);
    };

    const openEditModal = (product: Product) => {
        setModalMode("edit");
        setSelectedProduct(product);

        setForm({
            productName: product.productName ?? "",
            productId: product.productId ?? "",
            productDescription:
                product.productDescription ?? "",
            productPrice:
                product.productPrice !== undefined &&
                product.productPrice !== null
                    ? String(product.productPrice)
                    : "",
            productCost:
                product.productCost !== undefined &&
                product.productCost !== null
                    ? String(product.productCost)
                    : "",
            productStock:
                product.productStock !== undefined &&
                product.productStock !== null
                    ? String(product.productStock)
                    : "",
            productCategory:
                product.productCategory ?? "",
            productBrand:
                product.productBrand ?? "",
            productImage:
                product.productImage ?? "",
            productBatch:
                product.productBatch ?? "",
            productSupplier:
                product.productSupplier ?? "",
        });

        setOpenMenuProductId(null);
        setIsProductModalOpen(true);
    };

    const closeProductModal = () => {
        if (isSaving) {
            return;
        }

        setIsProductModalOpen(false);
        setModalMode("create");
        setSelectedProduct(null);
        setForm(initialForm);
    };

    const handleSaveProduct = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setIsSaving(true);

            const token = getToken();

            if (!token) {
                toast.error(
                    "Sessão não encontrada."
                );
                return;
            }

            if (!API_URL) {
                toast.error(
                    "URL da API não configurada."
                );
                return;
            }

            if (!form.productName.trim()) {
                toast.error(
                    "Informe o nome do produto."
                );
                return;
            }

            if (!form.productId.trim()) {
                toast.error(
                    "Informe o ID do produto."
                );
                return;
            }

            const body = {
                productName:
                    form.productName.trim(),

                productId:
                    form.productId.trim(),

                productDescription:
                    form.productDescription.trim(),

                productPrice:
                    Number(form.productPrice),

                productCost:
                    Number(form.productCost),

                productStock:
                    Number(form.productStock),

                productCategory:
                    form.productCategory.trim(),

                productBrand:
                    form.productBrand.trim(),

                productImage:
                    form.productImage.trim(),

                productBatch:
                    form.productBatch.trim(),

                productSupplier:
                    form.productSupplier.trim(),
            };

            const endpoint =
                modalMode === "create"
                    ? `${API_URL}/products/create`
                    : `${API_URL}/products/update/${encodeURIComponent(
                          selectedProduct?.productId ??
                              form.productId.trim()
                      )}`;

            const method =
                modalMode === "create"
                    ? "POST"
                    : "PUT";

            const response = await fetch(
                endpoint,
                {
                    method,
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                }
            );

            const data =
                await response
                    .json()
                    .catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        data?.status ||
                        data?.error ||
                        `Erro ao ${
                            modalMode === "create"
                                ? "criar"
                                : "atualizar"
                        } produto. Status: ${
                            response.status
                        }`
                );
            }

            toast.success(
                modalMode === "create"
                    ? "Produto criado com sucesso!"
                    : "Produto atualizado com sucesso!"
            );

            setIsProductModalOpen(false);
            setModalMode("create");
            setSelectedProduct(null);
            setForm(initialForm);

            await fetchProducts();
        } catch (error) {
            console.error(
                "Erro ao salvar produto:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Não foi possível salvar o produto."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setOpenMenuProductId(null);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        if (isDeleting) {
            return;
        }

        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async () => {
        if (!selectedProduct) {
            return;
        }

        try {
            setIsDeleting(true);

            const token = getToken();

            if (!token) {
                toast.error(
                    "Sessão não encontrada."
                );
                return;
            }

            if (!API_URL) {
                toast.error(
                    "URL da API não configurada."
                );
                return;
            }

            const response = await fetch(
                `${API_URL}/products/delete/${encodeURIComponent(
                    selectedProduct.productId
                )}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data =
                await response
                    .json()
                    .catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        data?.status ||
                        data?.error ||
                        `Erro ao excluir produto. Status: ${response.status}`
                );
            }

            toast.success(
                "Produto excluído com sucesso!"
            );

            setIsDeleteModalOpen(false);
            setSelectedProduct(null);

            await fetchProducts();
        } catch (error) {
            console.error(
                "Erro ao excluir produto:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Não foi possível excluir o produto."
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50">
            <SideMenu />
            <Navbar />

            <main className="pt-20 lg:pl-72">
                <div className="flex flex-col gap-6 p-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5C9EAD]/10">
                                    <Package
                                        size={22}
                                        className="text-[#5C9EAD]"
                                    />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">
                                        Produtos
                                    </h1>

                                    <p className="text-sm text-slate-500">
                                        Gerencie os produtos do seu estoque
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={openCreateModal}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#5C9EAD] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4E8D9A] active:scale-[0.98]"
                        >
                            <Plus size={18} />
                            Novo produto
                        </button>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {/* Search */}
                        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-semibold text-slate-800">
                                    Lista de produtos
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    {filteredProducts.length}{" "}
                                    {filteredProducts.length === 1
                                        ? "produto encontrado"
                                        : "produtos encontrados"}
                                </p>
                            </div>

                            <div className="relative w-full sm:w-80">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Pesquisar produto..."
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:bg-white focus:ring-2 focus:ring-[#5C9EAD]/10"
                                />
                            </div>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
                                <Loader2
                                    size={30}
                                    className="animate-spin text-[#5C9EAD]"
                                />

                                <p className="text-sm text-slate-500">
                                    Carregando produtos...
                                </p>
                            </div>
                        )}

                        {/* Error */}
                        {!loading && error && (
                            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-6 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                                    <AlertTriangle
                                        size={22}
                                        className="text-red-500"
                                    />
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        Não foi possível carregar os produtos
                                    </p>

                                    <p className="mt-1 max-w-md text-sm text-slate-500">
                                        {error}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={fetchProducts}
                                    className="rounded-lg bg-[#5C9EAD] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4E8D9A]"
                                >
                                    Tentar novamente
                                </button>
                            </div>
                        )}

                        {/* Empty */}
                        {!loading &&
                            !error &&
                            filteredProducts.length ===
                                0 && (
                                <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                        <Package
                                            size={26}
                                            className="text-slate-400"
                                        />
                                    </div>

                                    <p className="mt-4 font-semibold text-slate-700">
                                        {search
                                            ? "Nenhum produto encontrado"
                                            : "Nenhum produto cadastrado"}
                                    </p>

                                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                                        {search
                                            ? "Tente pesquisar por outro nome, ID ou categoria."
                                            : "Comece cadastrando seu primeiro produto."}
                                    </p>

                                    {!search && (
                                        <button
                                            type="button"
                                            onClick={
                                                openCreateModal
                                            }
                                            className="mt-5 flex items-center gap-2 rounded-lg bg-[#5C9EAD] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4E8D9A]"
                                        >
                                            <Plus
                                                size={17}
                                            />
                                            Criar produto
                                        </button>
                                    )}
                                </div>
                            )}

                        {/* Table */}
                        {!loading &&
                            !error &&
                            filteredProducts.length >
                                0 && (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[950px]">
                                        <thead>
                                            <tr className="border-b border-slate-200 bg-slate-50/70">
                                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Produto
                                                </th>

                                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    ID
                                                </th>

                                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Categoria
                                                </th>

                                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Preço
                                                </th>

                                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Estoque
                                                </th>

                                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Status
                                                </th>

                                                <th className="w-16 px-5 py-4"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredProducts.map(
                                                (
                                                    product
                                                ) => {
                                                    const status =
                                                        getProductStatus(
                                                            product.productStock
                                                        );

                                                    const isMenuOpen =
                                                        openMenuProductId ===
                                                        product.productId;

                                                    return (
                                                        <tr
                                                            key={
                                                                product._id ||
                                                                product.productId
                                                            }
                                                            className="border-b border-slate-100 transition hover:bg-slate-50/60"
                                                        >
                                                            {/* Product */}
                                                            <td className="px-5 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#5C9EAD]/10">
                                                                        {product.productImage ? (
                                                                            <img
                                                                                src={
                                                                                    product.productImage
                                                                                }
                                                                                alt={
                                                                                    product.productName
                                                                                }
                                                                                className="h-full w-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <Package
                                                                                size={
                                                                                    19
                                                                                }
                                                                                className="text-[#5C9EAD]"
                                                                            />
                                                                        )}
                                                                    </div>

                                                                    <div className="min-w-0">
                                                                        <p className="truncate font-medium text-slate-800">
                                                                            {
                                                                                product.productName
                                                                            }
                                                                        </p>

                                                                        <p className="truncate text-xs text-slate-500">
                                                                            {
                                                                                product.productBrand
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* ID */}
                                                            <td className="px-5 py-4">
                                                                <div className="flex max-w-[220px] flex-col">
                                                                    <span className="truncate font-mono text-sm text-slate-700">
                                                                        {
                                                                            product.productId
                                                                        }
                                                                    </span>

                                                                    <span
                                                                        title={
                                                                            product._id
                                                                        }
                                                                        className="truncate text-[11px] text-slate-400"
                                                                    >
                                                                        {
                                                                            product._id
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            {/* Category */}
                                                            <td className="px-5 py-4">
                                                                <span className="text-sm text-slate-600">
                                                                    {
                                                                        product.productCategory
                                                                    }
                                                                </span>
                                                            </td>

                                                            {/* Price */}
                                                            <td className="px-5 py-4">
                                                                <div>
                                                                    <p className="text-sm font-semibold text-slate-800">
                                                                        {formatPrice(
                                                                            product.productPrice
                                                                        )}
                                                                    </p>

                                                                    <p className="text-xs text-slate-400">
                                                                        Custo:{" "}
                                                                        {formatPrice(
                                                                            product.productCost
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </td>

                                                            {/* Stock */}
                                                            <td className="px-5 py-4">
                                                                <span className="text-sm font-medium text-slate-700">
                                                                    {
                                                                        product.productStock
                                                                    }
                                                                </span>
                                                            </td>

                                                            {/* Status */}
                                                            <td className="px-5 py-4">
                                                                <span
                                                                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                                                                >
                                                                    {
                                                                        status.label
                                                                    }
                                                                </span>
                                                            </td>

                                                            {/* Actions */}
                                                            <td className="relative px-5 py-4">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setOpenMenuProductId(
                                                                            isMenuOpen
                                                                                ? null
                                                                                : product.productId
                                                                        )
                                                                    }
                                                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                                >
                                                                    <MoreVertical
                                                                        size={
                                                                            19
                                                                        }
                                                                    />
                                                                </button>

                                                                {isMenuOpen && (
                                                                    <div className="absolute right-5 top-14 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                openEditModal(
                                                                                    product
                                                                                )
                                                                            }
                                                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                                                                        >
                                                                            <Pencil
                                                                                size={
                                                                                    16
                                                                                }
                                                                                className="text-[#5C9EAD]"
                                                                            />

                                                                            <span>
                                                                                Atualizar
                                                                                produto
                                                                            </span>
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                openDeleteModal(
                                                                                    product
                                                                                )
                                                                            }
                                                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
                                                                        >
                                                                            <Trash2
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />

                                                                            <span>
                                                                                Excluir
                                                                                produto
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        {/* Footer */}
                        {!loading &&
                            !error &&
                            filteredProducts.length >
                                0 && (
                                <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                                    <span>
                                        Mostrando{" "}
                                        <strong className="text-slate-700">
                                            {
                                                filteredProducts.length
                                            }
                                        </strong>{" "}
                                        de{" "}
                                        <strong className="text-slate-700">
                                            {
                                                products.length
                                            }
                                        </strong>{" "}
                                        produtos
                                    </span>

                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSearch(
                                                    ""
                                                )
                                            }
                                            className="font-medium text-[#5C9EAD] hover:underline"
                                        >
                                            Limpar pesquisa
                                        </button>
                                    )}
                                </div>
                            )}
                    </div>
                </div>
            </main>

            {/* Product Modal */}
            {isProductModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeProductModal();
                        }
                    }}
                >
                    <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    {modalMode === "create"
                                        ? "Novo produto"
                                        : "Atualizar produto"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {modalMode ===
                                    "create"
                                        ? "Preencha os dados para cadastrar um novo produto."
                                        : "Altere os dados do produto e salve as mudanças."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeProductModal
                                }
                                disabled={isSaving}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={
                                handleSaveProduct
                            }
                            className="overflow-y-auto"
                        >
                            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                                {/* Product Name */}
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Nome do produto *
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            form.productName
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productName",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Ex: Teclado Mecânico"
                                        required
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Product ID */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        ID do produto *
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            form.productId
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productId",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Ex: PROD-001"
                                        required
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 font-mono text-sm text-slate-700 outline-none transition placeholder:font-sans placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10 disabled:bg-slate-50 disabled:text-slate-400"
                                    />

                                    {modalMode ===
                                        "edit" && (
                                        <p className="mt-1.5 text-xs text-slate-400">
                                            Este é o identificador usado pela API.
                                        </p>
                                    )}
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Marca
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            form.productBrand
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productBrand",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Ex: Logitech"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Categoria
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            form.productCategory
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productCategory",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Ex: Eletrônicos"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Batch */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Lote
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            form.productBatch
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productBatch",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Ex: LOTE-2026-01"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Preço
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={
                                            form.productPrice
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productPrice",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="0,00"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Cost */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Custo
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={
                                            form.productCost
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productCost",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="0,00"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Estoque
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={
                                            form.productStock
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productStock",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="0"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Supplier */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Fornecedor
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            form.productSupplier
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productSupplier",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Ex: Tech Distribuidora"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Image */}
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        URL da imagem
                                    </label>

                                    <input
                                        type="url"
                                        value={
                                            form.productImage
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productImage",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="https://..."
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>

                                {/* Description */}
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Descrição
                                    </label>

                                    <textarea
                                        value={
                                            form.productDescription
                                        }
                                        onChange={(event) =>
                                            handleFormChange(
                                                "productDescription",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Descreva o produto..."
                                        rows={4}
                                        className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5C9EAD] focus:ring-2 focus:ring-[#5C9EAD]/10"
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/50 px-6 py-4 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={
                                        closeProductModal
                                    }
                                    disabled={isSaving}
                                    className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5C9EAD] px-6 text-sm font-semibold text-white transition hover:bg-[#4E8D9A] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2
                                                size={
                                                    17
                                                }
                                                className="animate-spin"
                                            />

                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            {modalMode ===
                                            "create"
                                                ? "Criar produto"
                                                : "Salvar alterações"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen &&
                selectedProduct && (
                    <div
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
                        onMouseDown={(event) => {
                            if (
                                event.target ===
                                event.currentTarget
                            ) {
                                closeDeleteModal();
                            }
                        }}
                    >
                        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
                                        <AlertTriangle
                                            size={22}
                                            className="text-red-500"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800">
                                            Excluir produto?
                                        </h2>

                                        <p className="mt-1 text-sm leading-6 text-slate-500">
                                            Tem certeza que deseja excluir{" "}
                                            <strong className="font-semibold text-slate-700">
                                                {
                                                    selectedProduct.productName
                                                }
                                            </strong>
                                            ? Essa ação não poderá ser desfeita.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs text-slate-400">
                                                ID do produto
                                            </p>

                                            <p className="mt-1 font-mono text-sm font-medium text-slate-700">
                                                {
                                                    selectedProduct.productId
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-right text-xs text-slate-400">
                                                Estoque
                                            </p>

                                            <p className="mt-1 text-right text-sm font-semibold text-slate-700">
                                                {
                                                    selectedProduct.productStock
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/50 p-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={
                                        closeDeleteModal
                                    }
                                    disabled={
                                        isDeleting
                                    }
                                    className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleDeleteProduct
                                    }
                                    disabled={
                                        isDeleting
                                    }
                                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isDeleting ? (
                                        <>
                                            <Loader2
                                                size={
                                                    17
                                                }
                                                className="animate-spin"
                                            />

                                            Excluindo...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2
                                                size={
                                                    17
                                                }
                                            />

                                            Excluir produto
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}