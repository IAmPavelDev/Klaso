import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LoginForm } from "@/widgets/Forms/Login";
import { CredentialsLogin } from "@/services/auth/login.server";
import { createUserSession } from "@/services/cookie/cookieStorage.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Klaso | Login" },
    { name: "description", content: "Public educational results platform" },
  ];
};

type LoginCredentialsType = {
  email: string;
  password: string;
};

const checkIsObjValid = (obj: any): obj is LoginCredentialsType => {
  return "email" in obj && "password" in obj;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  if (!checkIsObjValid(data)) return redirect("/reg");

  const LoginResponse = await CredentialsLogin(data);

  if (
    !LoginResponse ||
    LoginResponse.status !== "success" ||
    !LoginResponse.userId
  )
    return redirect("/reg");

  return redirect("/", {
    headers: await createUserSession(LoginResponse.userId),
  });
};

export const loader = () => {
  return "hi";
};

export default function Login() {
  const data = useLoaderData<typeof loader>();

  return <LoginForm method="POST" action="/login" />;
}
