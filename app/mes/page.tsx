import { getCurrentUser } from "@/lib/session";

async function MesPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl">MES area riservata</h1>
      <h2 className="text-2xl">
        Benvenuto
        <span className="ml-1 font-semibold text-primary">{user.email}</span>
      </h2>
    </div>
  );
}

export default MesPage;
