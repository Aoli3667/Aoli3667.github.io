import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://aoli3667.github.io",
  output: "static",
  integrations: [sitemap()],
  build: {
    assets: "assets",
  },
});
