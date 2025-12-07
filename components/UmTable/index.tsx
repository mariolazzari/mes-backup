import { Um } from "@/types/Um";

export type UmTableProps = {
  ums: Um[];
};

export type UmDialogProps = {
  um?: Um;
};

export type UmDeleteProps = {
  um: Um;
};

export * from "./UmDataTable";
