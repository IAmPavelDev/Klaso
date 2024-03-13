import ClassService from "@/services/classes/Classes.server";
import TeacherService from "@/services/users/Teacher.server";
import { ClassType } from "@/types/Class";
import { Classes } from "@/widgets/Classes";
import { ClassesHead } from "@/widgets/ControlHead";
import { useStore } from "@/zustand/store";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet, json, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Klaso" },
    { name: "description", content: "Public educational results platform" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const classes = await ClassService.getAll();

  const teachersQueries = classes.map(
    (classInfo: ClassType | undefined) =>
      classInfo && TeacherService.getById(classInfo.teacher)
  );

  const teachers = (await Promise.all(teachersQueries)).filter(
    (t) => typeof t === "object" && Object.keys(t).length > 0
  );

  return json({ classes, teachers });
};

export default function Component() {
  const userType = useStore((store) => store.userType);
  const { classes: classesData, teachers: teachersData } =
    useLoaderData<typeof loader>();

  return (
    <div
      style={{
        backgroundColor: "var(--light-grey)",
        minHeight: "calc(100dvh - 56px)",
      }}
    >
      {userType === "teacher" && <ClassesHead />}
      <Classes classesData={classesData} teachersData={teachersData} />
      <Outlet />
    </div>
  );
}
