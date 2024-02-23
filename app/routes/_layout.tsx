import ClassService from "@/services/classes/Classes.server";
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

  return json({ classes });
};

export default function Component() {
  const userType = useStore((store) => store.userType);
  const { classes: classesData } = useLoaderData<typeof loader>();

  return (
    <div
      style={{
        backgroundColor: "var(--light-grey)",
        minHeight: "calc(100dvh - 56px)",
      }}
    >
      {userType === "teacher" && <ClassesHead />}
      <Classes classesData={classesData} />
      <Outlet />
    </div>
  );
}
