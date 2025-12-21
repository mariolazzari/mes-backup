"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { RefreshCcw, Save } from "lucide-react";
import { ComponentProps } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export function SaveButton(props: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <DialogClose>
      <Button
        className="w-28 cursor-pointer"
        type="submit"
        disabled={pending}
        {...props}
      >
        {pending ? <RefreshCcw className="animate-spin" /> : <Save />} Salva
      </Button>
    </DialogClose>
  );
}
