import Image from "next/image";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verify } from "@/actions/user";

type VerifyPageProps = {
  searchParams: Promise<{
    email: string;
    qr: string;
  }>;
};

async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { email, qr } = await searchParams;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form className="shadow-md p-4 rounded-md" action={verify}>
        <CardHeader>
          <CardTitle className="text-center mb-4">MES OTP Login</CardTitle>
          <CardDescription>
            Utilizza questo QR code in Google Authenticator
          </CardDescription>
        </CardHeader>
        <CardContent className="w-[380px] my-4 flex flex-col items-center">
          <Image
            className="mx-auto"
            src={qr}
            alt="QR Code"
            width={250}
            height={250}
          />

          <InputOTP name="token" maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter className="flex justify-center">
          <input type="hidden" name="email" value={email} />
          <Button className="cursor-pointer">Verifica</Button>
        </CardFooter>
      </form>
    </div>
  );
}

export default VerifyPage;
