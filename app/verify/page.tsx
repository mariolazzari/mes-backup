import { query } from "@/lib/db";
import { User } from "@/types/User";
import speakeasy from "speakeasy";
import Image from "next/image";
import { redirect } from "next/navigation";
import { setUserSession } from "@/lib/session";

interface VerifyPageProps {
  searchParams: Promise<{
    email: string;
    qr: string;
  }>;
}

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
    if (rows.length === 0) throw new Error("User not found");

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
    <>
      <p>Scan this QR code in Google Authenticator:</p>
      <Image src={qr} alt="QR Code" width={200} height={200} />

      <form action={verify}>
        <input
          type="text"
          name="token"
          placeholder="Enter TOTP code"
          required
        />
        <button type="submit">Verify</button>
      </form>
    </>
  );
}
