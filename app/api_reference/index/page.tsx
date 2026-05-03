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
      <p>
        Rio/OS v2 OpenAPI specification. The spec is also published on{" "}
        <a
          href="https://app.swaggerhub.com/apis/riocorp/rioos/2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          SwaggerHub
        </a>
        .
      </p>
      <blockquote>
        <strong>Caution</strong> — API is subject to change until 2.0 is released. This
        documentation is archived; endpoints are no longer reachable.
      </blockquote>
      <div className="redoc-host">
        <RedocView />
      </div>
    </article>
  );
}
