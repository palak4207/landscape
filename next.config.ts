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

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://landscape-git-main-palak4207s-projects.vercel.app/api/:path*",
      },
    ];
  },

  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,DELETE,PATCH,POST,PUT",
  //         },
  //       ],
  //     },
  //   ];
  // },
  /* config options here */
};

export default nextConfig;
