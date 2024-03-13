import { isCreateClassType } from "@/helpers/typecheck";
import ClassService from "@/services/classes/Classes.server";
import { getUserSession } from "@/services/cookie/cookieStorage.server";
import { TeacherGuard } from "@/services/guards/Teacher.server";
import TeacherService from "@/services/users/Teacher.server";
import { ClassForm } from "@/widgets/Forms/Class";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (!(await TeacherGuard(request))) return redirect("/", 403);

  const body = Object.fromEntries((await request.formData()).entries());

  const teacher = (await getUserSession(request)).get("userId");

  const classData = {
    ...body,
    teacher,
  };

  if (!isCreateClassType(classData)) return redirect("/", 400);

  const newClass = await ClassService.create(classData);

  if (!newClass || Object.keys(newClass).length === 0)
    return redirect("/", 400);

  const newTeacher = await TeacherService.pushClass(newClass.id, teacher);

  if (!newTeacher || Object.keys(newTeacher).length === 0)
    return redirect("/", 400);

  return redirect("/");
};

export default function Component() {
  return <ClassForm />;
}
