import { getCurrentUser } from "@/lib/session";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "../ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";

export async function AppBar() {
  const user = await getCurrentUser();

  return (
    <nav className="h-12 flex justify-between items-center px-2 w-full bg-sidebar">
      <SidebarTrigger className="bg-transparent rounded-full" />

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu payload={user} />
      </div>
    </nav>
  );
}
