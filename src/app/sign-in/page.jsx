import { redirect } from "next/navigation";
import { currentStaff, demoEnabled } from "../../features/auth/session";
import { Login } from "../../features/auth/login";

export default async function SignIn() {
  if (await currentStaff()) redirect("/");
  return <Login enabled={demoEnabled()} />;
}
