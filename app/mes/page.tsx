import { getProds } from "@/actions/mes";
import { getWorkCenter } from "@/actions/wc";
import { MesBar } from "@/components/MesBar";
import { MesTable } from "@/components/MesTable/MesTable";

export const dynamic = "force-dynamic";

async function MesPage() {
  const mes = await getProds();
  const wcs = await getWorkCenter();

  return (
    <div className="flex flex-col items-center h-full p-4">
      <MesBar wcs={wcs} />
      <MesTable mes={mes} />
    </div>
  );
}

export default MesPage;
