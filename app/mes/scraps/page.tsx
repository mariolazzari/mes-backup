import { getScraps } from "@/actions/scrap";
import { ScrapTable } from "@/components/ScrapDataTable";

export const dynamic = "force-dynamic";

async function ScrapsPage() {
  const scraps = await getScraps();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl text-center font-semibold">Causali scarto</h2>
      <ScrapTable scraps={scraps} />
    </div>
  );
}

export default ScrapsPage;
