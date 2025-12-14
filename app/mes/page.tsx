import { getProds } from "@/actions/mes";
import { getScraps } from "@/actions/scrap";
import { getUms } from "@/actions/um";
import { getWorkCenters } from "@/actions/wc";
import { MesTable } from "@/components/MesTable/MesTable";
import { MesProvider } from "@/components/Providers/MesProvider";

export const dynamic = "force-dynamic";

type MesPageProps = {
  searchParams: Promise<{
    page: number;
    size: number;
  }>;
};

async function MesPage({ searchParams }: MesPageProps) {
  // read search params
  const { page = 1, size = 10 } = await searchParams;
  // load data
  const [{ prods, total }, wcs, scraps, ums] = await Promise.all([
    getProds(page, size),
    getWorkCenters(),
    getScraps(),
    getUms(),
  ]);

  return (
    <div className="flex flex-col items-center h-full p-4">
      <MesProvider value={{ wcs, scraps, ums }}>
        <MesTable mes={prods} page={page} size={size} total={total} />
      </MesProvider>
    </div>
  );
}

export default MesPage;
