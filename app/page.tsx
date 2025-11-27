import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

export default function Home() {
  async function register(formData: FormData) {
    "use server";

    const email = formData.get("email");
    if (typeof email !== "string") throw new Error("Invalid email");

    // 1️⃣ Controlla se l'utente esiste già
    const rows = await query<{ totp_secret: string }>(
      "SELECT totp_secret FROM users WHERE email = $1",
      [email]
    );

    let secretBase32: string;
    let qrCodeDataUrl: string;

    if (rows.length === 0) {
      // ✅ Utente nuovo → genera secret TOTP
      const secret = speakeasy.generateSecret({
        name: `MES (${email})`,
        issuer: "MES",
      });

      secretBase32 = secret.base32;

      // Salva l'utente nel DB solo la prima volta
      await query("INSERT INTO users (email, totp_secret) VALUES ($1, $2)", [
        email,
        secretBase32,
      ]);

      if (!secret.otpauth_url)
        throw new Error("Failed to generate otpauth_url for TOTP");
      qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    } else {
      // 🔹 Utente esistente → riusa il secret esistente
      secretBase32 = rows[0].totp_secret;

      const otpauthUrl = `otpauth://totp/MES:${email}?secret=${secretBase32}&issuer=MES`;
      qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);
    }

    // 2️⃣ Redirect alla pagina di verifica con QR code
    redirect(
      `/verify?email=${encodeURIComponent(email)}&qr=${encodeURIComponent(
        qrCodeDataUrl
      )}`
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className="shadow-md">
        <form action={register}>
          <CardHeader>
            <CardTitle className="text-center mb-4">MES Login</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="w-[350px] h-20 my-4">
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="email">Mail utente</FieldLabel>
                <Input
                  className="focus:bg-primary-foreground"
                  id="email"
                  name="email"
                  placeholder="Indirizzo email..."
                  type="email"
                />
                <FieldError></FieldError>
              </Field>
            </FieldSet>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="cursor-pointer">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
