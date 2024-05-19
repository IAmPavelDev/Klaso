import { isStudentOmitPwd } from "@/helpers/typecheck";
import ResponseService from "@/services/responses/Responses.server";
import StudentService from "@/services/users/Student.server";
import { StudentProfile } from "@/widgets/StudentProfile";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) return redirect("/");

  const studentInfo = await StudentService.getById(id);

  if (!isStudentOmitPwd(studentInfo)) return redirect("/");

  const works = await ResponseService.getAll(studentInfo.responses);

  if (!works) return redirect("/");

  return json({ works, studentInfo });
};

export default function Index() {
  const { works, studentInfo } = useLoaderData<typeof loader>();

  return <StudentProfile data={studentInfo} works={works} />;
}
