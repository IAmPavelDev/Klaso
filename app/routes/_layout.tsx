import ClassService from "@/services/classes/Classes.server";
import { StudentGuard } from "@/services/guards/Student.server";
import { TeacherGuard } from "@/services/guards/Teacher.server";
import TaskService from "@/services/tasks/Tasks.server";
import TeacherService from "@/services/users/Teacher.server";
import { ClassType } from "@/types/Class";
import { Classes } from "@/widgets/Classes";
import { ClassesHead } from "@/widgets/ControlHead";
import { useStore } from "@/zustand/store";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet, json, redirect, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Klaso" },
    { name: "description", content: "Public educational results platform" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [isTeacher, isStudent] = await Promise.all([
    TeacherGuard(request),
    StudentGuard(request),
  ]);

  if (!isTeacher && !isStudent) return redirect("/", 403);

  const classes = await ClassService.getAll();

  const teachersQueries = classes.map(
    (classInfo: ClassType | undefined) =>
      classInfo && TeacherService.getById(classInfo.teacher)
  );

  const firstTasksQueries = classes
    .filter((c): c is ClassType => Boolean(c))
    .map((classInfo) => classInfo.tasks[classInfo.tasks.length - 1])
    .map((id: string) => TaskService.getById(id));

  const teachersDataQuery = Promise.all(teachersQueries);
  const firstTasksQuery = Promise.all(firstTasksQueries);

  const [teachersDirty, firstsTasksDirty] = await Promise.all([
    teachersDataQuery,
    firstTasksQuery,
  ]);

  const teachers = teachersDirty.filter(
    (t) => typeof t === "object" && Object.keys(t).length > 0
  );

  const firstTasks = firstsTasksDirty.filter(
    (t) => typeof t === "object" && Object.keys(t).length > 0
  );

  return json({ classes, teachers, firstTasks });
};

export default function Component() {
  const userType = useStore((store) => store.userType);
  const {
    classes: classesData,
    teachers: teachersData,
    firstTasks,
  } = useLoaderData<typeof loader>();

  return (
    <div
      style={{
        backgroundColor: "var(--light-grey)",
        minHeight: "calc(100dvh - 56px)",
      }}
    >
      {userType === "teacher" && <ClassesHead />}
      {(userType === "teacher" || userType === "student") && (
        <Classes
          classesData={classesData}
          teachersData={teachersData}
          firstTasks={firstTasks}
        />
      )}
      <Outlet />
    </div>
  );
}
