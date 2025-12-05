import { MesBar } from "@/components/MesBar";

export const dynamic = "force-dynamic";

async function MesPage() {
  return (
    <div className="flex flex-col items-center h-full p-4">
      <MesBar />
    </div>
  );
}

export default MesPage;
