"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Trash2 } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function DeleteButton({
  className,
  ...props
}: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={(cn("w-full md:w-28 cursor-pointer"), className)}
      variant="destructive"
      type="submit"
      disabled={pending}
      {...props}
    >
      {pending ? <RefreshCcw className="animate-spin" /> : <Trash2 />}Elimina
    </Button>
  );
}
