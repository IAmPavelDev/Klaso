import { isStudentOmitPwd } from "@/helpers/typecheck";
import StudentService from "@/services/users/Student.server";
import { LoaderFunctionArgs, json, ActionFunctionArgs } from "@remix-run/node";

//operates GET request
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");

  if (!query) return json({ students: [] });

  const students = await StudentService.search(query);

  return json({ students });
};

//operates POST request
export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();

  if (!("studentsIds" in data && Array.isArray(data.studentsIds))) {
    return null;
  }

  if (
    data.studentsIds.length === 0 &&
    !data.studentsIds.every((id: unknown) => typeof id === "string")
  ) {
    return null;
  }

  const studentQueries = data.studentsIds.map((id: string) =>
    StudentService.getById(id)
  );

  const students = await Promise.all(studentQueries);

  if (!students.every(isStudentOmitPwd)) return null;

  return json({ students });
};
