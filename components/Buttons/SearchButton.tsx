"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { RefreshCcw, Search } from "lucide-react";
import { ComponentProps } from "react";

export function SearchButton(props: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-28 cursor-pointer"
      type="submit"
      disabled={pending}
      {...props}
    >
      {pending ? <RefreshCcw className="animate-spin" /> : <Search />} Cerca
    </Button>
  );
}
