export const queues = [
  { id: "incoming", statuses: ["submitted"] },
  { id: "active", statuses: ["accepted", "preparing"] },
  { id: "ready", statuses: ["ready"] },
];

const fixtures = [
  {
    id: "1042",
    status: "submitted",
    time: "12:34",
    items: [
      { name: "Sumac chicken pita", quantity: 2, price: 4200 },
      { name: "Lemonade", quantity: 1, price: 1200 },
    ],
  },
  {
    id: "1041",
    status: "submitted",
    time: "12:31",
    items: [{ name: "Roasted cauliflower", quantity: 1, price: 3600 }],
  },
  {
    id: "1040",
    status: "preparing",
    time: "12:25",
    items: [{ name: "Falafel platter", quantity: 2, price: 3400 }],
  },
  {
    id: "1039",
    status: "ready",
    time: "12:20",
    items: [{ name: "Chicken bowl", quantity: 1, price: 5200 }],
  },
];

export async function fetchDemoOrders(location = "olive-and-ember") {
  if (location === "noodle-yard")
    return [
      {
        id: "2042",
        status: "submitted",
        time: "12:40",
        items: [{ name: "Noodles", quantity: 1, price: 4800 }],
      },
    ];
  return location === "olive-and-ember" ? structuredClone(fixtures) : [];
}

export function orderTotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function ordersInQueue(orders, queue) {
  return orders.filter(({ status }) => queue.statuses.includes(status));
}
