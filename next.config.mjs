import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this folder so the old Vite lockfile in the
  // parent directory doesn't confuse Turbopack's root detection.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
