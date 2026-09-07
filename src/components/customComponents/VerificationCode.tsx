"use client";

import { useRef, useState } from "react";

export function VerificationCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(value: string, index: number) {
    // Permite somente números
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];

    // Caso cole mais de um número
    if (value.length > 1) {
      const numbers = value.slice(0, 6).split("");

      numbers.forEach((number, i) => {
        if (index + i < 6) {
          newCode[index + i] = number;
        }
      });

      setCode(newCode);

      const nextIndex = Math.min(index + numbers.length, 5);
      inputRefs.current[nextIndex]?.focus();

      return;
    }

    newCode[index] = value;

    setCode(newCode);

    // Vai para o próximo input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    // Se apertar Backspace com o campo vazio,
    // volta para o campo anterior
    if (
      event.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pastedData = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newCode = [...code];

    pastedData.split("").forEach((number, index) => {
      newCode[index] = number;
    });

    setCode(newCode);

    const nextIndex = Math.min(pastedData.length, 5);

    inputRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {code.map((value, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(event) =>
            handleChange(event.target.value, index)
          }
          onKeyDown={(event) =>
            handleKeyDown(event, index)
          }
          onPaste={handlePaste}
          className="
            h-12
            w-10
            rounded-xl
            border
            border-gray-200
            bg-white
            text-center
            text-lg
            font-semibold
            text-[#263238]
            outline-none
            transition-all

            focus:border-[#5C9EAD]
            focus:ring-4
            focus:ring-[#5C9EAD]/10

            sm:h-14
            sm:w-12
          "
        />
      ))}
    </div>
  );
}