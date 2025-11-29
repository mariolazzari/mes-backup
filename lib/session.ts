"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Payload } from "@/types/Payload";
import { getErrorMessage } from "./error";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function setUserSession(email: string): Promise<void> {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "8h" });
  (await cookies()).set("mes_auth_token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getCurrentUser(): Promise<Payload> {
  try {
    const token = (await cookies()).get("mes_auth_token")?.value;
    if (!token) {
      throw new Error("No auth token found");
    }
    return jwt.verify(token, JWT_SECRET) as Payload;
  } catch (ex: unknown) {
    console.error(getErrorMessage(ex));
    redirect("/");
  }
}

export async function clearSession(): Promise<void> {
  (await cookies()).set("mes_auth_token", "", { path: "/", maxAge: 0 });
  redirect("/");
}
