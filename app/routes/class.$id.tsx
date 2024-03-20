import ClassService from "@/services/classes/Classes.server";
import TeacherService from "@/services/users/Teacher.server";
import { ClassInfo } from "@/widgets/ClassInfo";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) return;

  const classInfo = await ClassService.getById(id);

  if (!classInfo) return;

  const teacherInfo = await TeacherService.getById(classInfo.teacher);

  if (!teacherInfo) return;

  return json({ classInfo, teacherInfo });
};

export default function ClassPage() {
  const { classInfo, teacherInfo } = useLoaderData<typeof loader>();
  return <ClassInfo classInfo={classInfo} teacherInfo={teacherInfo} />;
}
