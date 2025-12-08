import { getProds } from "@/actions/mes";
import { MesBar } from "@/components/MesBar";
import { MesTable } from "@/components/MesTable/MesTable";

export const dynamic = "force-dynamic";

async function MesPage() {
  const mes = await getProds();

  return (
    <div className="flex flex-col items-center h-full p-4">
      <MesBar />
      <MesTable mes={mes} />
    </div>
  );
}

export default MesPage;
