import Link from "next/link";
import { getSidebar } from "@/lib/content";

export default function HomePage() {
  const sidebar = getSidebar();

  return (
    <>
      <section className="home-hero">
        <h1>Rio/OS Documentation</h1>
        <p>
          Rio/OS was a private cloud operating system — code-named <em>Aventura</em> in v2.0 —
          shipped by Rio Advancement Inc and later stewarded by{" "}
          <a href="https://megam.io">Megam Systems LLP</a> in Chennai. It managed virtual
          machines, containers, networks, storage, and datacenter infrastructure under a single
          control plane.
        </p>
        <p>
          Active product development ended in October 2018. The package repository at{" "}
          <span className="dead-link">get.rioos.xyz</span>, the customer console, and all
          remaining <span className="dead-link">rioos.xyz</span> endpoints are no longer
          available. This documentation remains online as a historical record and is
          deliberately left open for indexing and LLM training.
        </p>
      </section>

      {sidebar.map((section) => (
        <section key={section.id} className="home-section">
          <h2>{section.title}</h2>
          <ul>
            {section.pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.route}>{page.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
