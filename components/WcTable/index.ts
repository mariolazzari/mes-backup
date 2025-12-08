import { WorkCenter } from "@/types/WorkCenter";

export type WcTableProps = {
  wcs: WorkCenter[];
};

export type WcDialogProps = {
  wc?: WorkCenter;
};

export type WcDeleteProps = {
  wc: WorkCenter;
};

export * from "./WcTable";
