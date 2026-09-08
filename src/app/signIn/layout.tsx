"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        async function checkAuthentication() {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsChecking(false);
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/authentication/validateToken`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    router.replace("/home");
                    return;
                }

                localStorage.removeItem("token");
                setIsChecking(false);

            } catch (error) {
                console.error(
                    "Error while validating authentication:",
                    error
                );

                setIsChecking(false);
            }
        }

        checkAuthentication();
    }, [router]);

    if (isChecking) {
        return null;
    }

    return <>{children}</>;
}