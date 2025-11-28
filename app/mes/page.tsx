import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

async function MesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl">Benvenuto {user.email}</h1>
      <h2 className="text-2xl">MES area riservata</h2>
    </div>
  );
}

export default MesPage;
