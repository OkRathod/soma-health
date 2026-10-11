import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Soma Health",
    short_name: "Soma",
    description: "Your personal AI health and fitness companion",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f2ec",
    theme_color: "#171713",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}