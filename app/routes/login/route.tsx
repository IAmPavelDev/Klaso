import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { LoginForm } from "@/widgets/Forms/LoginForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Klaso | Login" },
    { name: "description", content: "Public educational results platform" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  request.formData().then((data) => console.log(data.entries().next().value));

  return null;
};

export const loader = () => {
  return "hi";
};

export default function Login() {
  const data = useLoaderData<typeof loader>();

  return <LoginForm method="POST" action="/login" />;
}
