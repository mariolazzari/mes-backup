import { getCurrentUser } from "@/lib/session";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "../ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";

export async function AppBar() {
  const user = await getCurrentUser();

  return (
    <nav className="h-[50px] flex justify-between items-center px-2 w-full bg-primary">
      <Button className="rounded-full" variant="outline" size="icon">
        <SidebarTrigger />
      </Button>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu payload={user} />
      </div>
    </nav>
  );
}
