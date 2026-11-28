import { signIn, signOut } from "../../../features/auth/session";

export async function POST(request) {
  if (
    request.headers.get("origin") !==
    new URL(request.url).protocol + "//" + request.headers.get("host")
  )
    return new Response(null, { status: 403 });
  const body = await request.json().catch(() => null);
  return new Response(null, { status: (await signIn(body?.id)) ? 204 : 403 });
}

export async function DELETE(request) {
  if (
    request.headers.get("origin") !==
    new URL(request.url).protocol + "//" + request.headers.get("host")
  )
    return new Response(null, { status: 403 });
  await signOut();
  return new Response(null, { status: 204 });
}
