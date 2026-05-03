import type { Metadata } from "next";
import RedocView from "./redoc-view";

export const metadata: Metadata = {
  title: "API Reference",
  description: "Rio/OS v2 OpenAPI specification",
  alternates: { canonical: "https://docs.rioos.megam.io/api_reference/index" }
};

export default function ApiReferencePage() {
  return (
    <article className="content-page page-api_reference-index api-reference">
      <h1>API Reference</h1>
      <p>Rio/OS v2 OpenAPI specification, rendered from the archived spec.</p>
      <blockquote>
        <strong>Archived</strong> — Rio/OS active development ended in 2018. Endpoints
        documented below are no longer reachable; this reference is preserved for
        historical context.
      </blockquote>
      <div className="redoc-host">
        <RedocView />
      </div>
    </article>
  );
}
