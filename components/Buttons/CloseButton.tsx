"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function CloseButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <DialogClose asChild>
      <Button
        className={(cn("w-full md:w-28 cursor-pointer"), className)}
        variant="outline"
        {...props}
      >
        <X /> Chiudi
      </Button>
    </DialogClose>
  );
}
