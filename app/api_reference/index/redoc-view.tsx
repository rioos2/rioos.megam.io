"use client";

import { RedocStandalone } from "redoc";

export default function RedocView() {
  return (
    <RedocStandalone
      specUrl="/swagger.yaml"
      options={{
        scrollYOffset: 56,
        hideDownloadButton: false,
        nativeScrollbars: true,
        theme: {
          colors: {
            primary: { main: "#3df5c5" },
            success: { main: "#a6ff00" },
            warning: { main: "#ffb000" },
            error: { main: "#ff2d95" },
            text: {
              primary: "rgba(255, 255, 255, 0.92)",
              secondary: "rgba(255, 255, 255, 0.6)"
            },
            border: { dark: "rgba(61, 245, 197, 0.6)", light: "rgba(61, 245, 197, 0.2)" },
            http: {
              get: "#3df5c5",
              post: "#a6ff00",
              put: "#ffb000",
              delete: "#ff2d95",
              patch: "#a6ff00",
              options: "#a6ff00",
              basic: "#3df5c5",
              link: "#3df5c5",
              head: "#3df5c5"
            }
          },
          schema: {
            nestedBackground: "#11131a",
            linesColor: "rgba(61, 245, 197, 0.2)",
            typeNameColor: "#3df5c5",
            typeTitleColor: "#a6ff00"
          },
          sidebar: {
            backgroundColor: "#0a0a0f",
            textColor: "rgba(255, 255, 255, 0.92)",
            activeTextColor: "#3df5c5",
            arrow: { color: "#3df5c5" }
          },
          rightPanel: {
            backgroundColor: "#11131a",
            textColor: "rgba(255, 255, 255, 0.92)"
          },
          codeBlock: {
            backgroundColor: "#0a0a0f"
          },
          typography: {
            fontSize: "14px",
            fontFamily:
              "\"General Sans\", ui-sans-serif, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
            headings: {
              fontFamily: "\"Fraunces\", Georgia, serif",
              fontWeight: "600"
            },
            code: {
              fontFamily: "\"JetBrains Mono\", \"IBM Plex Mono\", ui-monospace, monospace",
              color: "#3df5c5",
              backgroundColor: "#0a0a0f"
            },
            links: {
              color: "#3df5c5",
              visited: "#3df5c5",
              hover: "#3df5c5"
            }
          }
        }
      }}
    />
  );
}
