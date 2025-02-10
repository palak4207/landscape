import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "drive.google.com",
      "res.cloudinary.com",
      "landscapearchitects1-my.sharepoint.com",
    ], // Add hostnames here
  },
  /* config options here */
};

export default nextConfig;
