import { expect, test } from "@playwright/test";
test("ROM-AUTH-001 staff access, restaurant membership and sign out", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/sign-in/);
  expect(
    (await page.request.get("/api/orders?location=olive-and-ember")).status(),
  ).toBe(401);
  await page.getByRole("button", { name: "Manager", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Orders", exact: true }),
  ).toBeVisible();
  await page.getByLabel("Restaurant").selectOption("noodle-yard");
  await expect(page.getByRole("button", { name: /2042/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /1042/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/sign-in/);
  await page
    .getByRole("button", { name: "Kitchen staff", exact: true })
    .click();
  await expect(page.getByRole("button", { name: /1042/ })).toBeVisible();
  expect(
    (await page.request.get("/api/orders?location=noodle-yard")).status(),
  ).toBe(403);
  await page.reload();
  await expect(page.getByRole("button", { name: /1042/ })).toBeVisible();
});
