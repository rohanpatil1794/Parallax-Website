import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.ADMIN_SECRET ?? "dev-secret-change-in-prod";
export const COOKIE = "travello_admin";
export const CREDS = { user: "admin", pass: "admin@123" };

export function signSession(payload) {
  const data = JSON.stringify(payload);
  const sig = createHmac("sha256", SECRET).update(data).digest("hex");
  return Buffer.from(JSON.stringify({ data, sig })).toString("base64url");
}

export function verifySession(token) {
  try {
    const { data, sig } = JSON.parse(Buffer.from(token, "base64url").toString());
    const expected = createHmac("sha256", SECRET).update(data).digest("hex");
    if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function requireAdmin(request) {
  const token = request.cookies.get(COOKIE)?.value;
  const session = token ? verifySession(token) : null;
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}
