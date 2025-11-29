import { formatTimestamp } from "@/lib/date";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

async function MesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  const tokens = user.email.split("@")[0].split(".");
  const initials = tokens.map(t => t.charAt(0).toUpperCase()).join("");

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl">Benvenuto {user.email}</h1>
      <h2 className="text-2xl">MES area riservata</h2>
      {initials}
      <p>Login {formatTimestamp(user.iat)}</p>
      <p>Logout {formatTimestamp(user.exp)}</p>
    </div>
  );
}

export default MesPage;
