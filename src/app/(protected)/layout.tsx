"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLoading from "@/components/customComponents/AuthLoading2";

type AuthStatus = "checking" | "success" | "error";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const [status, setStatus] = useState<AuthStatus>("checking");

    useEffect(() => {
        async function validateToken() {
            const token = localStorage.getItem("token");

            if (!token) {
                setStatus("error");

                setTimeout(() => {
                    router.replace("/signIn");
                }, 1000);

                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/authentication/validateToken`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    localStorage.removeItem("token");

                    setStatus("error");

                    setTimeout(() => {
                        router.replace("/signIn");
                    }, 1200);

                    return;
                }

                setStatus("success");

            } catch (error) {
                console.error("Erro ao validar token:", error);

                localStorage.removeItem("token");

                setStatus("error");

                setTimeout(() => {
                    router.replace("/signIn");
                }, 1200);
            }
        }

        validateToken();
    }, [router]);

    if (status !== "success") {
        return <AuthLoading status={status} />;
    }

    return <>{children}</>;
}