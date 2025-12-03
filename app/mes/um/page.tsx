import { getUms } from "@/actions/um";
import { UmDataTable } from "@/components/UmDataTable";

async function UmPage() {
  const ums = await getUms();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl text-center font-semibold">Unità di misura</h2>
      <UmDataTable ums={ums} />
    </div>
  );
}

export default UmPage;
