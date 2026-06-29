// Seed (or update) an admin account.
// Usage:
//   node --env-file=.env.local scripts/seedAdmin.mjs "Admin Name" admin@example.com password123
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const [, , name = "Admin", email = "admin@example.com", password = "admin123"] = process.argv;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    role: String,
  },
  { timestamps: true, strict: false }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not set. Run with: node --env-file=.env.local scripts/seedAdmin.mjs");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  const hash = await bcrypt.hash(password, 10);

  const res = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { name, email: email.toLowerCase(), password: hash, role: "admin" },
    { upsert: true, new: true }
  );

  console.log(`✅ Admin ready: ${res.email} (password: ${password})`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
