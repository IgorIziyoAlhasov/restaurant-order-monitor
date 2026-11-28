import { currentStaff } from "../../../features/auth/session";
import { canReadOrders } from "../../../features/auth/policy";
import { fetchDemoOrders } from "../../../features/orders/demo-orders";

export async function GET(request) {
  const staff = await currentStaff();
  if (!staff) return new Response(null, { status: 401 });
  const location = new URL(request.url).searchParams.get("location");
  if (!canReadOrders(staff, location))
    return new Response(null, { status: 403 });
  return Response.json(await fetchDemoOrders(location), {
    headers: { "Cache-Control": "private, no-store" },
  });
}
