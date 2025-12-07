import { Scrap } from "@/types/Scrap";

export type ScrapTableProps = {
  scraps: Scrap[];
};

export type ScrapFormProps = {
  scrap?: Scrap;
};

export type ScrapDeleteProps = {
  scrap: Scrap;
};

export * from "./ScrapTable";
