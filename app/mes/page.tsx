import { getProds } from "@/actions/mes";
import { getScraps } from "@/actions/scrap";
import { getUms } from "@/actions/um";
import { getWorkCenters } from "@/actions/wc";
import { MesTable } from "./mes-table";
import { MesProvider } from "@/components/Providers/MesProvider";
import { getCache } from "@/lib/cache";
import { Mes } from "@/types";

export const dynamic = "force-dynamic";

type MesPageProps = {
  searchParams: Promise<{
    page: number;
    size: number;
    from: string;
    to: string;
    odp: string;
    prodotto: string;
  }>;
};

async function MesPage({ searchParams }: MesPageProps) {
  // read search params
  const { page = 1, size = 10, from, to, odp, prodotto } = await searchParams;
  // load data
  const [{ prods, total }, wcs, scraps, ums, defaults] = await Promise.all([
    getProds(page, size, from, to, prodotto, odp),
    getWorkCenters(),
    getScraps(),
    getUms(),
    getCache<Partial<Mes>>("mes:last"),
  ]);

  return (
    <div className="flex flex-col items-center h-full p-4">
      <MesProvider value={{ wcs, scraps, ums, defaults }}>
        <MesTable mes={prods} page={page} size={size} total={total} />
      </MesProvider>
    </div>
  );
}

export default MesPage;
