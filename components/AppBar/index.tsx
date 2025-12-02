import { getCurrentUser } from "@/lib/session";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "../ThemeToggle";

export async function AppBar() {
  const user = await getCurrentUser();

  return (
    <div className="h-[50px] flex justify-between items-center px-2 w-full bg-primary">
      <ThemeToggle />
      <UserMenu payload={user} />
    </div>
  );
}
