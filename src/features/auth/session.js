import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { demoStaff } from "./policy";

const name = "rom_session";
const ttl = 8 * 60 * 60;
const sessions = (globalThis.__romDemoSessions ??= new Map());

export function demoEnabled() {
  return process.env.ROM_DEMO_MODE === "1";
}

export async function currentStaff() {
  if (!demoEnabled()) return null;
  const token = (await cookies()).get(name)?.value;
  const session = sessions.get(token);
  if (!session || session.expires <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  return demoStaff.find((staff) => staff.id === session.id) ?? null;
}

export async function signIn(id) {
  if (!demoEnabled() || !demoStaff.some((staff) => staff.id === id))
    return false;
  await signOut();
  const token = randomBytes(32).toString("hex");
  for (const [key, session] of sessions) {
    if (session.expires <= Date.now()) sessions.delete(key);
  }
  sessions.set(token, { id, expires: Date.now() + ttl * 1000 });
  (await cookies()).set(name, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.ROM_SECURE_COOKIES === "1",
    path: "/",
    maxAge: ttl,
  });
  return true;
}

export async function signOut() {
  const jar = await cookies();
  sessions.delete(jar.get(name)?.value);
  jar.delete(name);
}
