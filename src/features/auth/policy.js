export const locations = [
  { id: "olive-and-ember", name: "Olive & Ember" },
  { id: "noodle-yard", name: "Noodle Yard" },
];

export const demoStaff = [
  {
    id: "manager",
    name: "Demo manager",
    role: "manager",
    locations: ["olive-and-ember", "noodle-yard"],
  },
  {
    id: "kitchen",
    name: "Demo kitchen",
    role: "kitchen",
    locations: ["olive-and-ember"],
  },
];

export function canReadOrders(staff, location) {
  return Boolean(
    staff &&
    ["manager", "kitchen"].includes(staff.role) &&
    staff.locations.includes(location),
  );
}
