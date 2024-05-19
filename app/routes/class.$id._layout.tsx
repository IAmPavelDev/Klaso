import {
  isStudentOmitPwd,
  isTaskType,
  isTeacherOmitPwd,
} from "@/helpers/typecheck";
import ClassService from "@/services/classes/Classes.server";
import TaskService from "@/services/tasks/Tasks.server";
import StudentService from "@/services/users/Student.server";
import TeacherService from "@/services/users/Teacher.server";
import { ClassInfo } from "@/widgets/ClassInfo";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) return redirect("/");

  const classInfo = await ClassService.getById(id);

  if (!classInfo) return redirect("/");

  const teacherQuery = TeacherService.getById(classInfo.teacher);

  const studentQueries = classInfo.students.map((id: string) =>
    StudentService.getById(id)
  );
  const taskQueries = classInfo.tasks.map((id: string) =>
    TaskService.getById(id)
  );

  const studentsQuery = Promise.all(studentQueries);
  const tasksQuery = Promise.all(taskQueries);

  const [studentsInfo, tasksInfo, teacherInfo] = await Promise.all([
    studentsQuery,
    tasksQuery,
    teacherQuery,
  ]);

  if (
    !studentsInfo.every(isStudentOmitPwd) ||
    !tasksInfo.every(isTaskType) ||
    !isTeacherOmitPwd(teacherInfo)
  )
    return redirect("/");

  return json({ classInfo, teacherInfo, studentsInfo, tasksInfo });
};

export default function ClassPage() {
  const { tasksInfo, classInfo, teacherInfo, studentsInfo } =
    useLoaderData<typeof loader>();

  return (
    <>
      <ClassInfo
        studentsInfo={studentsInfo}
        classInfo={classInfo}
        teacherInfo={teacherInfo}
        tasksInfo={tasksInfo}
      />

      <Outlet />
    </>
  );
}
