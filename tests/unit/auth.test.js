import { expect, test } from "vitest";
import { canReadOrders, demoStaff } from "../../src/features/auth/policy";
test("only staff with location membership can read orders", () => {
  expect(canReadOrders(null, "olive-and-ember")).toBe(false);
  expect(canReadOrders(demoStaff[0], "noodle-yard")).toBe(true);
  expect(canReadOrders(demoStaff[1], "noodle-yard")).toBe(false);
  expect(canReadOrders(demoStaff[1], "olive-and-ember")).toBe(true);
  expect(
    canReadOrders({ ...demoStaff[0], role: "customer" }, "olive-and-ember"),
  ).toBe(false);
});
