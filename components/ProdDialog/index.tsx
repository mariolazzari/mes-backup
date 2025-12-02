import { Production } from "@/types/Production";

type Mode = "insert" | "update" | "clone";

export type ProdFormProps = {
  mode: Mode;
  prod?: Production;
};

export * from "./ProdDialog";
