"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProdFormProps } from ".";
import { MdAddTask, MdEdit, MdCyclone } from "react-icons/md";

export function ProdDialog({ mode }: ProdFormProps) {
  const [isProd, setProd] = useState(true);

  const renderIcon = () => {
    switch (mode) {
      case "insert":
        return <MdAddTask className="w-full! h-full!" />;

      case "update":
        return <MdEdit className="w-full! h-full!" />;

      case "clone":
        return <MdCyclone className="w-full! h-full!" />;

      default:
        const missingMode: never = mode;
        throw new Error(`Mode ${missingMode} not supported`);
    }
  };

  useEffect(() => {}, []);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-16 h-16 p-2" variant="outline" size="icon-lg">
            {renderIcon()}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isProd ? "Versamento" : "Consumo"}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
