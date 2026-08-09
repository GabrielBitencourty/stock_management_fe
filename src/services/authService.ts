import type { LoginFormData } from "@/schemas/authSchema";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { toast } from "sonner";

export async function signIn(data: LoginFormData) {
    const response = await fetch(`${API_URL}/authentication/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: data.userEmail,
            password: data.password
        })
    });

    const message = await response.json();

    if (response.status === 200) {
        toast.success(message.message);
    } else {
        toast.error(message.message);
    }

    return response.json();
}