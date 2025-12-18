import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://adamfopa-psychiatry-website.vercel.app";
  const routes = [
    "",
    "/services",
    "/about",
    "/new-patients",
    "/fees-and-insurance",
    "/contact",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    changefreq: "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));
}
