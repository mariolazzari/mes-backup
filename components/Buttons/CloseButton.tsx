"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

export function CloseButton() {
  return (
    <DialogClose asChild>
      <Button className="w-24 cursor-pointer" variant="outline">
        <X /> Chiudi
      </Button>
    </DialogClose>
  );
}
