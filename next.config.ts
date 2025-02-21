import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "drive.google.com",
      "res.cloudinary.com",
      "landscapearchitects1-my.sharepoint.com",
      "firebasestorage.googleapis.com",
    ], // Add hostnames here
  },
};

export default nextConfig;
