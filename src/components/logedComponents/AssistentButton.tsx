"use client";

import { useState } from "react";
import { BotMessageSquare } from "lucide-react";

import { Button } from "../ui/button";
import AgentChat from "./agentChat";

export function AssistentButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && (
                <Button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-50
                        h-14
                        w-14
                        rounded-full
                        bg-(--font-blue)
                        shadow-lg
                        hover:opacity-90
                    "
                >
                    <BotMessageSquare size={24} />
                </Button>
            )}

            {isOpen && (
                <AgentChat
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}