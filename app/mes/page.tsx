import { getProds } from "@/actions/mes";
import { getWorkCenter } from "@/actions/wc";
import { MesTable } from "@/components/MesTable/MesTable";

export const dynamic = "force-dynamic";

async function MesPage() {
  const mes = await getProds();
  const wcs = await getWorkCenter();

  return (
    <div className="flex flex-col items-center h-full p-4">
      <MesTable mes={mes} wcs={wcs} />
    </div>
  );
}

export default MesPage;
