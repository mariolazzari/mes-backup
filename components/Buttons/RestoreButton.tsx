"use client";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { MdSettingsBackupRestore } from "react-icons/md";
import { cn } from "@/lib/utils";

export function RestoreButton({
  className,
  ...props
}: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn("w-full md:w-28 cursor-pointer", className)}
      type="submit"
      disabled={pending}
      {...props}
    >
      {pending ? (
        <RefreshCcw className="animate-spin" />
      ) : (
        <MdSettingsBackupRestore />
      )}
      Ripristina
    </Button>
  );
}
