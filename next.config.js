const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  images: {
    domains: [
      "files.ninjabattler.ca",
      "ninjabattler.ca",
      "storage.googleapis.com",
      "cdn.sanity.io",
    ],
  },
});
