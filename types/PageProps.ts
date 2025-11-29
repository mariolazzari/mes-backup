type SearchParams = Record<string, string | string[]>;

export type PageProps<TParams extends SearchParams> = Partial<{
  searchParams: Promise<TParams>;
}>;
