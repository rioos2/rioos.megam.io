"use client";

import { RedocStandalone } from "redoc";

export default function RedocView() {
  return (
    <RedocStandalone
      specUrl="/swagger.yaml"
      options={{
        scrollYOffset: 56,
        hideDownloadButton: false,
        theme: {
          colors: { primary: { main: "#0c66e4" } },
          typography: {
            fontSize: "14px",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif"
          }
        }
      }}
    />
  );
}
