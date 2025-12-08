"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MesFormProps } from ".";
import { MdAddTask, MdEdit, MdCyclone } from "react-icons/md";
import { CloseButton, SaveButton } from "../Buttons";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export function MesForm({ mode, mes }: MesFormProps) {
  const [isProd, setProd] = useState(true);

  const renderIcon = useCallback(() => {
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
  }, [mode]);

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
            <DialogTitle>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isProd"
                  checked={isProd}
                  onCheckedChange={setProd}
                />
                <Label htmlFor="isProd">
                  {isProd ? "Versamento" : "Consumo"}
                </Label>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <CloseButton />
            <SaveButton />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
