import StudentService from "@/services/users/Student.server";
import { LoaderFunctionArgs, json } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");

  if (!query) return json({ students: [] });

  const students = await StudentService.search(query);

  return json({ students });
};
