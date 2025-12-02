import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserMenuProps } from ".";
import { formatTimestamp } from "@/lib/date";
import { clearSession } from "@/lib/session";

export function UserMenu({ payload }: UserMenuProps) {
  const { email, iat, exp } = payload;

  const renderInitials = () => {
    const tokens = payload.email.split("@")[0].split(".");
    return tokens.map(t => t.charAt(0).toUpperCase()).join("");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full font-semibold cursor-pointer"
          size="icon-sm"
          variant="outline"
        >
          {renderInitials()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start">
        <DropdownMenuLabel className="font-semibold text-center">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between">
            <span>Ultimo accesso</span> <span>{formatTimestamp(iat)}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>Scadenza sessione</span> <span>{formatTimestamp(exp)}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={clearSession}>
          Esci
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
