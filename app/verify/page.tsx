import { query } from "@/lib/db";
import { User } from "@/types/User";
import speakeasy from "speakeasy";
import Image from "next/image";
import { redirect } from "next/navigation";
import { setUserSession } from "@/lib/session";
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

type VerifyPageProps = {
  searchParams: Promise<{
    email: string;
    qr: string;
  }>;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { email, qr } = await searchParams;

  // Server Action
  async function verify(formData: FormData) {
    "use server";
    const token = formData.get("token");
    if (typeof token !== "string") throw new Error("Invalid token");

    const rows = await query<User>(
      "SELECT totp_secret FROM users WHERE email = $1",
      [email]
    );
    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const secret = rows[0].totp_secret;

    const valid = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!valid) {
      throw new Error("Invalid code");
    }

    await setUserSession(email);
    redirect("/mes");
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form className="shadow-md p-4 rounded-md" action={verify}>
        <CardHeader>
          <CardTitle className="text-center mb-4">MES OTP Login</CardTitle>
          <CardDescription>
            Utilizza questo QR code in Google Authenticator
          </CardDescription>
        </CardHeader>
        <CardContent className="w-[400px] my-4 flex flex-col items-center">
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
          <Button className="cursor-pointer">Verifica</Button>
        </CardFooter>
      </form>
    </div>
  );
}
