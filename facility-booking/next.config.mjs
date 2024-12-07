/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
