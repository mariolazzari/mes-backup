type SearchParams = Record<string, string | string[] | undefined>;

export type PageProps<TParams extends SearchParams> = Partial<{
  searchParams: Promise<TParams>;
}>;
