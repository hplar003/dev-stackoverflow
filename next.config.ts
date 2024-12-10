import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        port: "",
      },
    ],
  },
  // transpilePackages: ["@mdxeditor/editor"],
  // reactStrictMode: true,
  // webpack: (config) => {
  //   // this will override the experiments
  //   config.experiments = { ...config.experiments, topLevelAwait: true };
  //   // this will just update topLevelAwait property of config.experiments
  //   // config.experiments.topLevelAwait = true
  //   return config;
  // },
};

export default nextConfig;
