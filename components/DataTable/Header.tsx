import { ChevronDown } from "lucide-react";
import { HeaderProps } from ".";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

export function Header<T>({
  table,
  add,
  searchField,
  searchPlaceholder,
}: HeaderProps<T>) {
  return (
    <div className="flex items-center py-4 gap-2">
      {add}
      {searchField && (
        <Input
          placeholder={searchPlaceholder}
          value={
            (table
              .getColumn(searchField as string)
              ?.getFilterValue() as string) ?? ""
          }
          onChange={e =>
            table
              .getColumn(searchField as string)
              ?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Colonne <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter(column => column.getCanHide())
            .map(column => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
