import { getCurrentUser } from "@/lib/session";
import { UserMenu } from "@/components/UserMenu";

export async function AppBar() {
  const user = await getCurrentUser();

  return (
    <div className="h-[50px] flex justify-end items-center px-2 w-full bg-primary">
      <UserMenu payload={user} />
    </div>
  );
}
