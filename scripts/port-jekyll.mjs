// Port Jekyll directory-based docs into content/{section}/{slug}.mdx
// - Strips Liquid tags ({% include %}, {{ var }}) and kramdown attr lists ({: .x}, {: target="_blank"})
// - Carries title/description, derives `order` from filename (index → 0, prerequisites → 1, ...)
// - Rewrites /docs/doks-theme/assets/images/... -> /img/...
// - Drops .html suffix from internal links so they resolve against Next.js routing
// - Annotates dead get.rioos.xyz / package URLs at render time too

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "content");

const SECTIONS = [
  "getting_started",
  "high_availability",
  "command_center",
  "cli",
  "datacenters",
  "networks",
  "nodes",
  "storages",
  "scaling",
  "security",
  "telemetry",
  "quick_starters",
  "blockchaindev",
  "api_reference",
  "release_notes",
  "contact"
];

// Filename -> order. index always first; everything else alphabetical fallback.
function orderFor(slug, fallback) {
  if (slug === "index") return 0;
  const known = {
    prerequisites: 1,
    installing: 1,
    system_requirements: 2,
    failover: 1,
    horizontal: 1,
    vertical: 2,
    container: 1,
    digitalcloud: 2,
    manage: 3,
    blockchain_infrastructure: 1,
    continious_integration_deploy: 2,
    deploy_custom_app: 3
  };
  return known[slug] ?? fallback;
}

function stripLiquid(src) {
  src = src.replace(/\{%[\s\S]*?%\}/g, "");
  src = src.replace(/\{\{[\s\S]*?\}\}/g, "");
  src = src.replace(/^\s*\{:[^}]*\}\s*$/gm, "");
  src = src.replace(/\s*\{:[^}]*\}/g, "");
  return src;
}

function rewriteAssets(src) {
  // /docs/doks-theme/assets/images/foo.png -> /img/foo.png
  src = src.replace(/\/docs\/doks-theme\/assets\/images\//g, "/img/");
  src = src.replace(/\/doks-theme\/assets\/images\//g, "/img/");
  // /docs/<path>.html -> /<path>
  src = src.replace(/\(\/docs\/([^)\s]+?)\.html(#[^)]*)?\)/g, (_m, p, hash) => `(/${p}${hash ?? ""})`);
  src = src.replace(/\(\/docs\/([^)\s]+?)\)/g, (_m, p) => `(/${p})`);
  // Bare `/something.html` internal -> `/something`
  src = src.replace(/\(\/([^)\s]+?)\.html(#[^)]*)?\)/g, (_m, p, hash) => `(/${p}${hash ?? ""})`);
  return src;
}

function parseFrontmatter(src) {
  if (!src.startsWith("---")) return { meta: {}, body: src };
  const end = src.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: src };
  const fm = src.slice(3, end);
  const body = src.slice(end + 4).replace(/^\n/, "");
  // Pull only top-level scalar keys we care about. Indented YAML (page_nav, author, hero buttons)
  // is intentionally ignored — the new Next.js layout owns navigation.
  const meta = {};
  for (const line of fm.split("\n")) {
    if (/^\s/.test(line)) continue; // skip nested entries
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const k = line.slice(0, sep).trim();
    let v = line.slice(sep + 1).trim();
    if (!v) continue;
    v = v.replace(/^['"]|['"]$/g, "");
    meta[k] = v;
  }
  return { meta, body };
}

function emitFrontmatter(meta) {
  const lines = ["---"];
  if (meta.title) lines.push(`title: ${meta.title}`);
  if (meta.order !== undefined) lines.push(`order: ${meta.order}`);
  if (meta.description) lines.push(`description: ${meta.description.replace(/\s+/g, " ")}`);
  lines.push("---", "");
  return lines.join("\n");
}

function convert(src, slug, fallbackOrder) {
  const { meta, body } = parseFrontmatter(src);
  let cleaned = stripLiquid(body);
  cleaned = rewriteAssets(cleaned);
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  meta.order = orderFor(slug, fallbackOrder);
  return emitFrontmatter(meta) + cleaned.trim() + "\n";
}

let count = 0;
for (const sectionId of SECTIONS) {
  const srcDir = path.join(ROOT, sectionId);
  if (!fs.existsSync(srcDir)) continue;
  const dstDir = path.join(OUT, sectionId);
  fs.mkdirSync(dstDir, { recursive: true });
  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".md")).sort();
  files.forEach((file, idx) => {
    const slug = file.replace(/\.md$/, "");
    const src = fs.readFileSync(path.join(srcDir, file), "utf8");
    const out = convert(src, slug, idx + 10);
    fs.writeFileSync(path.join(dstDir, `${slug}.mdx`), out);
    count++;
    console.log(`  ${sectionId}/${file}  ->  content/${sectionId}/${slug}.mdx`);
  });
}

console.log(`\nPorted ${count} files into content/`);
