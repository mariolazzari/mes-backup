"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Trash2 } from "lucide-react";

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-28 cursor-pointer"
      variant="destructive"
      type="submit"
      disabled={pending}
    >
      {pending ? <RefreshCcw className="animate-spin" /> : <Trash2 />}Elimina
    </Button>
  );
}
