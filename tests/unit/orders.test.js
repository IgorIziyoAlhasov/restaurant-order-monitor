import { expect, test } from "vitest";
import {
  fetchDemoOrders,
  orderTotal,
  ordersInQueue,
  queues,
} from "../../src/features/orders/demo-orders";
import { messages } from "../../src/locales/messages";

test("demo orders are independent and assigned to the correct queues", async () => {
  const orders = await fetchDemoOrders();
  expect(queues.map((queue) => ordersInQueue(orders, queue).length)).toEqual([
    2, 1, 1,
  ]);
  expect(orderTotal(orders[0])).toBe(9600);
  orders[0].status = "ready";
  expect((await fetchDemoOrders())[0].status).toBe("submitted");
});

test("all locales have the same keys", () => {
  for (const locale of Object.values(messages))
    expect(Object.keys(locale).sort()).toEqual(Object.keys(messages.en).sort());
});
