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

    const result = await response.json()

    console.log(result)

    if (response.status === 200) {
        toast.success(result.message)
    } else {
        toast.error(result.message)
    }

    return result
}