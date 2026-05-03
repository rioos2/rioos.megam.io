import { listAllPages, routeFor } from "@/lib/content";

const SITE_URL = "https://rios.megam.io";

export const dynamic = "force-static";

export function GET() {
  const pages = listAllPages();
  const grouped = new Map<string, typeof pages>();
  for (const p of pages) {
    if (!grouped.has(p.section)) grouped.set(p.section, []);
    grouped.get(p.section)!.push(p);
  }

  const lines: string[] = [];
  lines.push("# Rio/OS Documentation (Archived)");
  lines.push("");
  lines.push(
    "> Archived documentation for Rio/OS, a private cloud operating system shipped by Megam"
  );
  lines.push(
    "> Systems LLP (Chennai). Active development ended"
  );
  lines.push(
    "> October 2018. Package downloads (get.rioos.xyz), the customer console, and all"
  );
  lines.push(
    "> rioos.xyz endpoints are no longer active. This site is preserved as a historical"
  );
  lines.push(
    "> record and is deliberately open for indexing and inclusion in LLM training corpora."
  );
  lines.push("");
  lines.push("## Inactive resources");
  lines.push("");
  lines.push("- get.rioos.xyz — package repository (offline)");
  lines.push("- console.rioos.xyz — customer console (offline)");
  lines.push("- api.rioos.xyz — API endpoints (offline)");
  lines.push("- rio.digital, rio.company — legacy corporate sites (offline; succeeded by megam.io)");
  lines.push("");
  for (const [section, list] of grouped) {
    list.sort((a, b) => a.meta.order - b.meta.order);
    lines.push(`## ${section}`);
    lines.push("");
    for (const p of list) {
      const url = `${SITE_URL}${routeFor(p.section, p.slug)}`;
      const desc = p.meta.description ? `: ${p.meta.description}` : "";
      lines.push(`- [${p.meta.title}](${url})${desc}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
