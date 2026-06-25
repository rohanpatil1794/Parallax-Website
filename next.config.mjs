/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is served from /public, so no remote patterns are required.
    // Kept here for when Supabase Storage / a CDN is wired in later.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
