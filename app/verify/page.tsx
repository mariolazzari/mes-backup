import { verify } from "@/actions/user";
import { Otp } from "@/components/Otp/Otp";
import { VerifyPageProps } from ".";

async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { email, qr } = await searchParams;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form action={verify}>
        <Otp qrUrl={qr} />
        <input type="hidden" name="email" value={email} />
      </form>
    </div>
  );
}

export default VerifyPage;
