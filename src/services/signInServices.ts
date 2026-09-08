import type { LoginFormData } from "@/schemas/authSchema";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signIn(data: LoginFormData) {
    try {
        const response = await fetch(
            `${API_URL}/authentication/signIn`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: data.userEmail,
                    password: data.password,
                }),
            }
        );

        const result = await response.json();

        if (response.status === 200) {
            toast.success(result.message, {
                style: {
                    backgroundColor: "#5EA0AE",
                    color: "#fff",
                },
            });

            if (result.token) {
                localStorage.setItem("token", result.token);
            }
        } else {
            toast.error(result.message, {
                style: {
                    backgroundColor: "#ef4444",
                    color: "#fff",
                },
            });
        }

        return {
            ...result,
            statusCode: response.status,
        };

    } catch (error) {
        console.error("Erro ao realizar login:", error);

        toast.error("Unable to connect to the server.", {
            style: {
                backgroundColor: "#ef4444",
                color: "#fff",
            },
        });

        return {
            statusCode: 500,
            message: "Server connection error",
        };
    }
}
