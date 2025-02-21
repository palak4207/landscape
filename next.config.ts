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

  // async headers() {
  //   return [
  //     {
  //       // Apply headers to all routes
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Credentials",
  //           value: "true",
  //         },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           // Replace with your domain
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept- Version, Content - Length, Content - MD5, Content - Type, Date, X - Api - Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
