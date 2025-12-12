import { getWorkCenters } from "@/actions/wc";
import { WcTable } from "@/components/WcTable";

export const dynamic = "force-dynamic";

async function WcPage() {
  const wcs = await getWorkCenters();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl text-center font-semibold">Centri di lavoro</h2>
      <WcTable wcs={wcs} />
    </div>
  );
}

export default WcPage;
