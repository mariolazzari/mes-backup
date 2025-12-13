import { getProds } from "@/actions/mes";
import { getScraps } from "@/actions/scrap";
import { getWorkCenters } from "@/actions/wc";
import { MesTable } from "@/components/MesTable/MesTable";

export const dynamic = "force-dynamic";

type MesPageProps = {
  searchParams: Promise<{
    page: number;
    size: number;
  }>;
};

async function MesPage({ searchParams }: MesPageProps) {
  const { page = 1, size = 10 } = await searchParams;

  const [{ prods, total }, wcs, scraps] = await Promise.all([
    getProds(page, size),
    getWorkCenters(),
    getScraps(),
  ]);

  return (
    <div className="flex flex-col items-center h-full p-4">
      <MesTable
        mes={prods}
        wcs={wcs}
        scraps={scraps}
        page={page}
        size={size}
        total={total}
      />
    </div>
  );
}

export default MesPage;
