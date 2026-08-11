"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

import {
    Bot,
    Send,
    X,
    User,
} from "lucide-react";

interface AgentChatProps {
    onClose: () => void;
}

interface Message {
    id: number;
    sender: "agent" | "user";
    text: string;
}

export default function AgentChat({
    onClose,
}: AgentChatProps) {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "agent",
            text: "Hello, Gabriel! 👋 How can I help you?",
        },
    ]);

    function handleSendMessage() {
        if (!message.trim()) return;

        setMessages((currentMessages) => [
            ...currentMessages,
            {
                id: Date.now(),
                sender: "user",
                text: message,
            },
        ]);

        setMessage("");

        // Futuramente:
        // chamada para sua API / agente de IA
    }

    function handleKeyDown(
        event: KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    }

    return (
        <div
            className="
                fixed
                bottom-6
                right-6
                z-100
                flex
                h-130
                w-90
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-2xl
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between bg-(--font-blue) px-5 py-4 text-white">
                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                        <Bot size={20} />
                    </div>

                    <div>
                        <p className="text-sm font-semibold">
                            Assistente
                        </p>

                        <p className="text-xs text-white/70">
                            Online
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        rounded-lg
                        p-1.5
                        transition
                        hover:bg-white/10
                    "
                    aria-label="Fechar assistente"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-slate-50 p-4">

                {messages.map((item) => (
                    <div
                        key={item.id}
                        className={`flex ${
                            item.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div className="flex max-w-[80%] items-end gap-2">

                            {item.sender === "agent" && (
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8f5f8] text-(--font-blue)">
                                    <Bot size={15} />
                                </div>
                            )}

                            <div
                                className={`
                                    rounded-2xl
                                    px-4
                                    py-2.5
                                    text-sm
                                    ${
                                        item.sender === "user"
                                            ? "rounded-br-sm bg-(--font-blue) text-white"
                                            : "rounded-bl-sm bg-white text-slate-700 shadow-sm"
                                    }
                                `}
                            >
                                {item.text}
                            </div>

                            {item.sender === "user" && (
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                                    <User size={15} />
                                </div>
                            )}

                        </div>
                    </div>
                ))}

            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white p-3">

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-(--font-blue)">

                    <input
                        value={message}
                        onChange={(event) =>
                            setMessage(event.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Digite sua dúvida..."
                        className="
                            min-w-0
                            flex-1
                            bg-transparent
                            px-3
                            py-2
                            text-sm
                            text-slate-700
                            outline-none
                            placeholder:text-slate-400
                        "
                    />

                    <button
                        type="button"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-(--font-blue)
                            text-white
                            transition
                            hover:opacity-90
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        <Send size={16} />
                    </button>

                </div>

            </div>
        </div>
    );
}