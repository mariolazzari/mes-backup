export type VerifyPageProps = {
  searchParams: Promise<{
    email: string;
    qr: string;
  }>;
};
