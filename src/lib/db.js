import mongoose from "mongoose";

// Cache the connection across hot reloads in dev and across lambda invocations.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // Read at call time (not module load) so a corrected .env is picked up.
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local (see .env.example).");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Don't cache a failed attempt — otherwise every later request reuses the
    // rejected promise and keeps throwing even after the URI is fixed.
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}
