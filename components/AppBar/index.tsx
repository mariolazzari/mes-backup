import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export async function index() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  const tokens = user.email.split("@")[0].split(".");
  const initials = tokens.map(t => t.charAt(0).toUpperCase()).join("");

  return <div className="h-12"></div>;
}
