import { redirect } from "next/navigation";
import { currentStaff } from "../features/auth/session";
import { Workspace } from "../features/auth/workspace";

export default async function Home() {
  const staff = await currentStaff();
  if (!staff) redirect("/sign-in");
  return <Workspace staff={staff} />;
}
