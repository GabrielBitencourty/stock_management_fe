"use client";

import { useState } from "react";

import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";

import {
    Bell,
    Building2,
    Lock,
    Save,
    Settings,
    User,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [lowStockAlert, setLowStockAlert] = useState(true);

    return (
        <div className="min-h-screen w-full bg-slate-50">
            <SideMenu />
            <Navbar />

            <main className="pt-20 lg:pl-72">
                <div className="flex flex-col gap-6 p-6">

                    {/* HEADER */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5C9EAD]/10">
                                <Settings className="h-5 w-5 text-[#5C9EAD]" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Configurações
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Gerencie as configurações do sistema.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">

                        {/* CONTA */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                                        <User className="h-4 w-4 text-slate-600" />
                                    </div>

                                    <div>
                                        <CardTitle className="text-base">
                                            Minha conta
                                        </CardTitle>

                                        <p className="text-sm text-slate-500">
                                            Informações do usuário
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">

                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        Nome
                                    </Label>

                                    <Input
                                        id="name"
                                        defaultValue="Gabriel"
                                        placeholder="Seu nome"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        E-mail
                                    </Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue="gabriel@email.com"
                                        placeholder="seu@email.com"
                                    />
                                </div>

                                <Button className="bg-[#5C9EAD] hover:bg-[#4f8d9c]">
                                    <Save className="mr-2 h-4 w-4" />
                                    Salvar alterações
                                </Button>

                            </CardContent>
                        </Card>


                        {/* EMPRESA */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                                        <Building2 className="h-4 w-4 text-slate-600" />
                                    </div>

                                    <div>
                                        <CardTitle className="text-base">
                                            Empresa
                                        </CardTitle>

                                        <p className="text-sm text-slate-500">
                                            Informações da empresa
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">

                                <div className="grid gap-2">
                                    <Label htmlFor="company">
                                        Nome da empresa
                                    </Label>

                                    <Input
                                        id="company"
                                        defaultValue="Minha Empresa"
                                        placeholder="Nome da empresa"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="document">
                                        CNPJ
                                    </Label>

                                    <Input
                                        id="document"
                                        placeholder="00.000.000/0001-00"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">
                                        Telefone
                                    </Label>

                                    <Input
                                        id="phone"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>

                                <Button className="bg-[#5C9EAD] hover:bg-[#4f8d9c]">
                                    <Save className="mr-2 h-4 w-4" />
                                    Salvar empresa
                                </Button>

                            </CardContent>
                        </Card>


                        {/* NOTIFICAÇÕES */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                                        <Bell className="h-4 w-4 text-slate-600" />
                                    </div>

                                    <div>
                                        <CardTitle className="text-base">
                                            Notificações
                                        </CardTitle>

                                        <p className="text-sm text-slate-500">
                                            Controle os alertas do sistema
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-5">

                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Notificações do sistema
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Receber avisos e atualizações
                                        </p>
                                    </div>

                                    <Switch
                                        checked={notifications}
                                        onCheckedChange={setNotifications}
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Alerta de estoque baixo
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Avisar quando um produto estiver acabando
                                        </p>
                                    </div>

                                    <Switch
                                        checked={lowStockAlert}
                                        onCheckedChange={setLowStockAlert}
                                    />
                                </div>

                            </CardContent>
                        </Card>


                        {/* SEGURANÇA */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                                        <Lock className="h-4 w-4 text-slate-600" />
                                    </div>

                                    <div>
                                        <CardTitle className="text-base">
                                            Segurança
                                        </CardTitle>

                                        <p className="text-sm text-slate-500">
                                            Configurações de acesso
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">

                                <div className="grid gap-2">
                                    <Label htmlFor="current-password">
                                        Senha atual
                                    </Label>

                                    <Input
                                        id="current-password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="new-password">
                                        Nova senha
                                    </Label>

                                    <Input
                                        id="new-password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">
                                        Confirmar nova senha
                                    </Label>

                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <Button variant="outline">
                                    <Lock className="mr-2 h-4 w-4" />
                                    Alterar senha
                                </Button>

                            </CardContent>
                        </Card>

                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                        <p className="text-xs text-slate-400">
                            Configurações do sistema
                        </p>

                        <p className="text-xs text-slate-400">
                            Versão 1.0.0
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}