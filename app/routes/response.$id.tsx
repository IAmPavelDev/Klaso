import { isCreateResponseType } from "@/helpers/typecheck";
import { getUserSession } from "@/services/cookie/cookieStorage.server";
import { StudentGuard } from "@/services/guards/Student.server";
import { TeacherGuard } from "@/services/guards/Teacher.server";
import ResponseService from "@/services/responses/Responses.server";
import TaskService from "@/services/tasks/Tasks.server";
import StudentService from "@/services/users/Student.server";
import { ResponseInfo } from "@/widgets/ResponseInfo";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const CreateResponse = async (
  { request, params }: ActionFunctionArgs,
  formData: FormData
) => {
  const { id: responseId } = params;
  if (!StudentGuard(request)) return redirect("/login");

  const session = await getUserSession(request);
  const studentId = session.get("userId");

  if (!responseId) return redirect("/");

  const responseData = Object.fromEntries(formData);

  if (!StudentGuard(request) || !isCreateResponseType(responseData))
    return redirect("/");

  const newResponse = await ResponseService.create(responseData);

  if (!newResponse || Object.keys(newResponse).length === 0)
    return redirect("/");

  const updatedStudent = await StudentService.pushResponse(
    studentId,
    newResponse.id
  );

  const updatedTask = await TaskService.pushResponse(
    newResponse.task,
    responseId
  );

  if (!updatedStudent || Object.keys(updatedStudent).length === 0)
    return redirect("/");

  if (!updatedTask || Object.keys(updatedTask).length === 0)
    return redirect("/");

  return redirect(`/response/${newResponse.id}`);
};

const GradeResponse = async (
  { request, params }: ActionFunctionArgs,
  formData: FormData
) => {
  const { id: responseId } = params;
  if (!TeacherGuard(request)) return redirect("/login");

  if (!responseId) return redirect("/");

  const grade = formData.get("grade");

  if (!grade) return redirect("/");

  const updatedResponse = await ResponseService.update(
    { id: responseId },
    { grade: Number(grade) }
  );

  if (!updatedResponse || Object.keys(updatedResponse).length === 0)
    return redirect("/");

  return json({ status: "success" });
};

const EditResponse = async (
  { request, params }: ActionFunctionArgs,
  formData: FormData
) => {
  const { id: responseId } = params;
  const responseData = Object.fromEntries(formData);

  if (!StudentGuard(request)) return redirect("/login");

  const session = await getUserSession(request);
  const studentId = session.get("userId");

  if (
    !responseId ||
    !isCreateResponseType(responseData) ||
    studentId !== responseData.student
  )
    return redirect("/");

  const updatedResponse = await ResponseService.update(
    { id: responseId },
    responseData
  );

  if (!updatedResponse || Object.keys(updatedResponse).length === 0)
    return redirect("/");

  return redirect(`/response/${updatedResponse.id}`);
};

const DeleteResponse = async ({ request, params }: ActionFunctionArgs) => {
  const { id: responseId } = params;
  if (!StudentGuard(request)) return redirect("/login");

  const session = await getUserSession(request);
  const studentId = session.get("userId");

  if (!responseId) return redirect("/");

  const deletedResponse = await ResponseService.delete(responseId);

  if (!deletedResponse || Object.keys(deletedResponse).length === 0)
    return redirect("/");

  const [updatedStudent, updatedTask] = await Promise.all([
    StudentService.removeResponse(studentId, responseId),
    TaskService.removeResponse(deletedResponse.task, responseId),
  ]);

  if (
    !updatedStudent ||
    Object.keys(updatedStudent).length === 0 ||
    !updatedTask ||
    Object.keys(updatedTask).length === 0
  )
    return redirect("/");

  return redirect(`/task/${deletedResponse.task}`);
};

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "create") return CreateResponse(args, formData);
  if (intent === "grade") return GradeResponse(args, formData);
  if (intent === "delete") return DeleteResponse(args);
  if (intent === "edit") return EditResponse(args, formData);
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
