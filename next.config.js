/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // images.domains was removed in Next 16. remotePatterns is the
    // replacement and is narrower: it pins scheme and path, not just host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
