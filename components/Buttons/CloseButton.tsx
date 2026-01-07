"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { ComponentProps } from "react";

export function CloseButton(props: ComponentProps<"button">) {
  return (
    <DialogClose asChild>
      <Button className="w-28 cursor-pointer" variant="outline" {...props}>
        <X /> Chiudi
      </Button>
    </DialogClose>
  );
}
