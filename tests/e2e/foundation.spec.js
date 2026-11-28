import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("ROM-FND-002 shows synthetic queues and order details", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Manager", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Orders", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: /Incoming/ }).getByRole("button"),
  ).toHaveCount(2);
  await page.getByRole("button", { name: /1042/ }).click();
  await expect(page.getByRole("dialog")).toContainText("Sumac chicken pita");
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
});

test("ROM-FND-003 and ROM-FND-004 persist RTL and theme settings", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Manager", exact: true }).click();
  await page.getByLabel("Language").selectOption("he");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByLabel("ערכת נושא").selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "הזמנות", exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByLabel("שפה").selectOption("ru");
  await expect(
    page.getByRole("heading", { name: "Заказы", exact: true }),
  ).toBeVisible();
});
