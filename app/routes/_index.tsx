import { getUserSession } from "@/services/cookie/cookieStorage.server";
import StudentService from "@/services/users/Student.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Klaso" },
    { name: "description", content: "Public educational results platform" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  const user = await StudentService.getStudentById(userId);
  console.log(user);
  return {};
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <h1>Index</h1>;
}
