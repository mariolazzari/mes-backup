// lib/session.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function setUserSession(email: string) {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "8h" });
  (await cookies()).set("auth_token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getCurrentUser() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string };
    return payload;
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).set("auth_token", "", { path: "/", maxAge: 0 });
}
