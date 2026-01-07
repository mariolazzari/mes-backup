"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { RefreshCcw, Save } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function SaveButton({ className, ...props }: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={(cn("w-full md:w-28 cursor-pointer"), className)}
      type="submit"
      disabled={pending}
      {...props}
    >
      {pending ? <RefreshCcw className="animate-spin" /> : <Save />} Salva
    </Button>
  );
}
