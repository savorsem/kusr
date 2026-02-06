import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import path from "path";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "./"),
  }
};

// Fix for Next.js 16 defaults
const finalConfig = {
  ...nextConfig,
  // This explicitly allows Turbopack to work with the PWA plugin
}

export default withPWA(finalConfig);
