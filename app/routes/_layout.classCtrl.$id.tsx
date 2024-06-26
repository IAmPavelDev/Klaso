import { isCreateClassType } from "@/helpers/typecheck";
import ClassService from "@/services/classes/Classes.server";
import { getUserSession } from "@/services/cookie/cookieStorage.server";
import { TeacherGuard } from "@/services/guards/Teacher.server";
import TeacherService from "@/services/users/Teacher.server";
import { ClassForm } from "@/widgets/Forms/Class";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const DeleteClass = async (id: string) => {
  const deletedClass = await ClassService.delete(id);

  if (!deletedClass || Object.keys(deletedClass).length === 0)
    return redirect("/", 400);

  return redirect("/", 200);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  if (!(await TeacherGuard(request))) return redirect("/", 403);

  const { id: classId } = params;
  const formData = await request.formData();
  const entries = formData.entries();
  const { data } = Object.fromEntries(entries);

  const operationType = formData.get("intent");

  if (classId && operationType === "delete") return DeleteClass(classId);

  if (typeof data !== "string") return redirect("/", 400);

  const teacher = (await getUserSession(request)).get("userId");

  const classData = {
    ...JSON.parse(data),
    teacher,
  };

  if (!isCreateClassType(classData)) return redirect("/", 400);

  if (operationType === "create") {
    const newClass = await ClassService.create(classData);

    if (!newClass || Object.keys(newClass).length === 0)
      return redirect("/", 400);

    const newTeacher = await TeacherService.pushClass(newClass.id, teacher);

    if (!newTeacher || Object.keys(newTeacher).length === 0)
      return redirect("/", 400);

    return redirect(`/class/${newClass.id}`);
  } else if (classId && operationType === "update") {
    const updatedClass = await ClassService.update(classId, classData);

    if (!updatedClass || Object.keys(updatedClass).length === 0)
      return redirect("/", 400);

    return redirect(`/class/${updatedClass.id}`);
  }
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  if (!(await TeacherGuard(request))) return redirect("/", 403);

  const { id } = params;
  if (!id) return "new";

  if (id !== "new") {
    const initialData = await ClassService.getById(id);
    return json(initialData);
  }

  return id;
};

export default function Component() {
  const classInfo = useLoaderData<typeof loader>();

  return <ClassForm classInfo={classInfo} />;
}
