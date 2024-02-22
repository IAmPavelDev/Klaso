import { getUserSession } from "@/services/cookie/cookieStorage.server";
import { ClassForm } from "@/widgets/Forms/Class";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = Object.fromEntries((await request.formData()).entries());

  const session = await getUserSession(request);

  console.log(body, session.get("userId"));

  return redirect("/");
};

export default function Component() {
  return <ClassForm />;
}
