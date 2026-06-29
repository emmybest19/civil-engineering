import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "session";
const ALG = "HS256";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Add it to web/.env.local.");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Sign a session token. `payload` should be a small object: { id, role, name, email }.
export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

// Returns the decoded payload, or null if missing/invalid. Edge-safe (uses jose).
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] });
    return payload;
  } catch {
    return null;
  }
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
