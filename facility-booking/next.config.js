const nextConfig = {
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
  images: {
    domains: ["localhost"],
  },
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
