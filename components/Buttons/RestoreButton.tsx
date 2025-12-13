"use client";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { MdSettingsBackupRestore } from "react-icons/md";

export function RestoreButton(props: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-28 cursor-pointer"
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
