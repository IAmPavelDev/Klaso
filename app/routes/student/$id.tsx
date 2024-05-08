import { isStudentOmitPwd } from "@/helpers/typecheck";
import StudentService from "@/services/users/Student.server";
import { StudentProfile } from "@/widgets/StudentProfile";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) return redirect("/");

  console.log(id);

  const studentInfo = await StudentService.getById(id);

  if (!isStudentOmitPwd(studentInfo)) return redirect("/");

  return json(studentInfo);
};

export default function Index() {
  const studentInfo = useLoaderData<typeof loader>();

  return <StudentProfile data={studentInfo} />;
}
