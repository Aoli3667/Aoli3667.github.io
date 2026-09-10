import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootUrl = new URL("../dist/", import.meta.url);
const root = fileURLToPath(rootUrl);
const required = [
  "index.html",
  "zh/index.html",
  "about/index.html",
  "zh/about/index.html",
  "projects/restart/index.html",
  "projects/slimey/index.html",
  "projects/egaku/index.html",
  "projects/choices/index.html",
  "zh/projects/restart/index.html",
  "zh/projects/slimey/index.html",
  "zh/projects/egaku/index.html",
  "zh/projects/choices/index.html",
  "404.html",
  "resume/Allan-Tsai-Resume-2025.pdf",
  "sitemap-index.xml",
  "robots.txt",
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length) throw new Error(`Missing build outputs: ${missing.join(", ")}`);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
const forbidden = [/C:\\Users\\/i, /E:\\General\\/i, /codex-clipboard-/i];

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const label = relative(root, file);
  if (!html.includes("<link rel=\"canonical\"")) throw new Error(`${label} has no canonical URL`);
  if (!html.includes("hreflang=\"en\"") || !html.includes("hreflang=\"zh-Hant\"")) {
    throw new Error(`${label} is missing language alternates`);
  }
  if (!html.includes("<main id=\"main\"")) throw new Error(`${label} has no main landmark`);
  for (const pattern of forbidden) {
    if (pattern.test(html)) throw new Error(`${label} contains a local or temporary path`);
  }
}

console.log(`Validated ${required.length} required outputs and ${htmlFiles.length} HTML pages.`);
