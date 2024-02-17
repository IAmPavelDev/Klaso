import { logout } from "@/services/cookie/cookieStorage.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export function action({ request }: ActionFunctionArgs) {
  return logout(request);
}

export function loader() {
  return redirect("/login");
}
