"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" disabled={pending}>
      {pending ? "Eliminando..." : "Elimina"}
    </Button>
  );
}
