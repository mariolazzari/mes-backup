import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function MesPage() {
  const user = await getCurrentUser();

  console.log("user", user);

  if (!user) {
    redirect("/");
  }
  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>This is your protected messages page.</p>
    </div>
  );
}
