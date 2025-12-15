import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentProps } from "react";

export const DownloadButton = (props: ComponentProps<"button">) => (
  <Button
    className="cursor-pointer text-primary hover:text-primary"
    variant="outline"
    {...props}
  >
    <Download /> {props.children}
  </Button>
);
