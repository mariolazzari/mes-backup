"use server";
import speakeasy from "speakeasy";
import { query } from "@/lib/db";
import { setUserSession } from "@/lib/session";
import { User } from "@/types/User";
import QRCode from "qrcode";
import { redirect } from "next/navigation";

// register user OTP verification
export async function register(formData: FormData) {
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

// verify user OTP token
export async function verify(formData: FormData) {
  const token = formData.get("token");
  if (!token || typeof token !== "string") {
    throw new Error("Invalid token");
  }

  const email = formData.get("email");
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email");
  }

  const rows = await query<User>(
    "SELECT totp_secret FROM users WHERE email = $1",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Utente non trovato");
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
