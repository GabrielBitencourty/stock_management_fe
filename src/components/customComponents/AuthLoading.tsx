"use client"

import { Check, X } from "lucide-react";

type AuthStatus = "checking" | "success" | "error";

interface AuthLoadingProps {
    status: AuthStatus;
}

export default function AuthLoading({ status }: AuthLoadingProps) {
    if (status === "checking") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-6">

                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-bounce rounded-full bg-[#5C9EAD] [animation-delay:-0.3s]" />
                        <span className="h-3 w-3 animate-bounce rounded-full bg-[#5C9EAD] [animation-delay:-0.15s]" />
                        <span className="h-3 w-3 animate-bounce rounded-full bg-[#5C9EAD]" />
                    </div>

                    <div className="text-center">
                        <h2 className="text-xl font-semibold">
                            Verifying your access
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Validating your session...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-6">

                    <div
                        className="
                            flex h-24 w-24
                            animate-[scale-in_0.35s_ease-out]
                            items-center justify-center
                            rounded-full
                            border-2 border-[#5C9EAD]
                            bg-[#5C9EAD]/10
                        "
                    >
                        <Check
                            className="
                                h-12 w-12
                                animate-[check-in_0.4s_ease-out]
                                text-[#5C9EAD]
                            "
                            strokeWidth={2.5}
                        />
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">
                            Authorized access
                        </h2>

                        <p className="mt-1 text-md text-muted-foreground">
                            All set! Logging in...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">

                <div
                    className="
                        flex h-24 w-24
                        animate-[scale-in_0.35s_ease-out]
                        items-center justify-center
                        rounded-full
                        border-2 border-red-500
                        bg-red-500/10
                    "
                >
                    <X
                        className="
                            h-12 w-12
                            animate-[check-in_0.4s_ease-out]
                            text-red-500
                        "
                        strokeWidth={2.5}
                    />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-red-500">
                        Access denied
                    </h2>

                    <p className="mt-1 text-xl text-muted-foreground">
                       Your session is invalid or has expired.
                    </p>

                    <p className="mt-2 text-md text-muted-foreground">
                        Redirecting...
                    </p>
                </div>
            </div>
        </div>
    );
}
