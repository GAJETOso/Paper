import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sylvara Paper Group",
    short_name: "Sylvara",
    description: "Sustainable paper, packaging, and tissue manufacturer serving 140+ countries.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf7",
    theme_color: "#356c4f",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
