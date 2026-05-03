import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/getting_started/index",
  "/getting_started/installing",
  "/getting_started/system_requirements",
  "/high_availability/index",
  "/high_availability/failover",
  "/command_center/index",
  "/cli/index",
  "/datacenters/index",
  "/release_notes/index",
  "/security/index"
];

test.describe("rio/os archived docs", () => {
  for (const route of routes) {
    test(`renders ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 10, 15)");
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }

  test("archive banner appears on every page", async ({ page }) => {
    await page.goto("/");
    const banner = page.locator(".archive-banner");
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("Archived");
    await expect(banner).toContainText("get.rioos.xyz");
  });

  test("archive banner persists on inner pages", async ({ page }) => {
    await page.goto("/getting_started/installing");
    await expect(page.locator(".archive-banner")).toBeVisible();
  });

  test("dead rioos.xyz references render as inactive on home", async ({ page }) => {
    await page.goto("/");
    const dead = page.locator(".dead-link").first();
    await expect(dead).toBeVisible();
  });

  test("home links to Megam Systems and GitHub", async ({ page }) => {
    await page.goto("/");
    const header = page.getByLabel("Site header");
    await expect(header.getByRole("link", { name: "Megam Systems" })).toHaveAttribute(
      "href",
      "https://megam.io"
    );
    await expect(header.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/rioadvancement"
    );
  });

  test("sidebar groups visible", async ({ page }) => {
    await page.goto("/");
    const titles = page.locator(".side-nav .nav-section-title");
    await expect(titles.filter({ hasText: "Getting Started" })).toBeVisible();
    await expect(titles.filter({ hasText: "Command Center" })).toBeVisible();
    await expect(titles.filter({ hasText: "Release Notes" })).toBeVisible();
  });

  test("robots.txt and llms.txt are LLM-friendly", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("Allow: /");

    const llms = await request.get("/llms.txt");
    expect(llms.ok()).toBeTruthy();
    expect(await llms.text()).toContain("Rio/OS");
  });
});
