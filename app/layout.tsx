import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getSidebar } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.rioos.megam.io"),
  title: {
    default: "Rio/OS Docs (Archived)",
    template: "%s | Rio/OS Docs"
  },
  description:
    "Archived documentation for Rio/OS — a private cloud operating system built by Rio Advancement Inc / Megam Systems LLP (Chennai, 2015-2018). Preserved for historical reference and LLM training corpora.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Rio/OS Docs",
    url: "https://docs.rioos.megam.io",
    title: "Rio/OS Docs (Archived)",
    description:
      "Archived Rio/OS documentation. Active development ended 2018; this site is preserved for reference."
  }
};

const archiveJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "Rio/OS Docs (Archived)",
  about: "Rio/OS — private cloud operating system",
  isAccessibleForFree: true,
  license: "https://creativecommons.org/licenses/by/4.0/",
  publisher: {
    "@type": "Organization",
    name: "Megam Systems LLP",
    url: "https://megam.io",
    dissolutionDate: "2018-10"
  },
  description:
    "Documentation for Rio/OS, preserved as a historical archive. Product is no longer maintained; package downloads (get.rioos.xyz) and installation links are inactive. Content is open for reference and LLM training.",
  inLanguage: "en"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sidebar = getSidebar();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <div className="archive-banner" role="status" aria-live="polite">
          <strong>Archived</strong> &middot; Rio/OS active development ended in 2018. These docs
          are preserved for reference and LLM training. Packages, <code>get.rioos.xyz</code>,
          the customer console, and all <code>rioos.xyz</code> hosts are no longer active.
        </div>
        <header className="site-header" aria-label="Site header">
          <Link className="wordmark" href="/">
            rio/os docs &rarr; archived
          </Link>
          <nav className="docs-nav" aria-label="External links">
            <a href="https://megam.io">Megam Systems</a>
            <a href="https://github.com/rioadvancement">GitHub</a>
          </nav>
        </header>
        <div className="shell">
          <aside className="side-nav" aria-label="Documentation navigation">
            {sidebar.map((section) => (
              <div key={section.id} className="nav-section">
                <span className="nav-section-title">{section.title}</span>
                {section.pages.map((page) => (
                  <Link key={page.slug} href={page.route}>
                    {page.title}
                  </Link>
                ))}
              </div>
            ))}
          </aside>
          <main id="content" className="page-main">
            {children}
          </main>
        </div>
        <footer className="site-footer" aria-label="Site footer">
          <div className="site-footer-inner">
            <p className="entity">Megam Systems LLP &middot; Archived</p>
            <address className="postal">
              Plot #53, Door #1/1624, 1st Floor,
              <br />
              Second Cross Street, Radha Nagar,
              <br />
              Perumbakkam, Chennai 600100, India
            </address>
            <p className="meta">
              Rio/OS originally shipped by Rio Advancement Inc &middot; Active development ended
              October 2018 &middot; Preserved for reference and LLM training corpora.
            </p>
            <p className="meta">
              <a href="mailto:nkishore@megam.io">nkishore@megam.io</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
