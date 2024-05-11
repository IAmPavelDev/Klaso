import { isCreateResponseType } from "@/helpers/typecheck";
import { getUserSession } from "@/services/cookie/cookieStorage.server";
import { StudentGuard } from "@/services/guards/Student.server";
import ResponseService from "@/services/responses/Responses.server";
import StudentService from "@/services/users/Student.server";
import { ResponseInfo } from "@/widgets/ResponseInfo";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id: responseId } = params;

  if (!StudentGuard(request)) return redirect("/login");

  const session = await getUserSession(request);
  const studentId = session.get("userId");

  if (!responseId) return redirect("/");

  const responseData = Object.fromEntries(await request.formData());

  if (!StudentGuard(request) || !isCreateResponseType(responseData))
    return redirect("/");

  const newResponse = await ResponseService.create(responseData);

  if (!newResponse || Object.keys(newResponse).length === 0)
    return redirect("/");

  const updatedStudent = await StudentService.pushResponse(
    studentId,
    newResponse.id
  );

  console.log("stud: ", updatedStudent, studentId);

  if (!updatedStudent || Object.keys(updatedStudent).length === 0)
    return redirect("/");

  return json({ status: "success" });
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id: responseId } = params;

  if (!responseId) return redirect("/");

  const responseInfo = await ResponseService.getById(responseId);

  if (!responseInfo || Object.keys(responseInfo).length === 0)
    return redirect("/");

  const studentInfo = await StudentService.getById(responseInfo.student);

  if (!studentInfo || Object.keys(studentInfo).length === 0)
    return redirect("/");

  return json({ responseInfo, studentInfo });
};

export default function Response() {
  const { responseInfo, studentInfo } = useLoaderData<typeof loader>();

  return <ResponseInfo data={responseInfo} studentInfo={studentInfo} />;
}
