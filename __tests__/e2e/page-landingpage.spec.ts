import { test, expect } from "@playwright/test";

test("testing env: renders landing page ", async ({ page }) => {
  await page.goto("/"); // remember -- we don't have to provide full URL as we already set baseUrl in playwright config file
  await expect(page).toHaveURL("/");
});

test("testing env:  opens login page", async ({ page }) => {
  await page.goto("/"); // remember -- we don't have to provide full URL as we already set baseUrl in playwright config file
  await expect(page).toHaveURL("/");

  // Using Playwright's locator to find the button by text content
  const button = await page.locator('button:has-text("Get Started Now")');
  await button.click();

  await expect(page).toHaveURL("/login");
});
