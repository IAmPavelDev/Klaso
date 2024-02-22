import { Classes } from "@/widgets/Classes";
import { ClassesHead } from "@/widgets/ControlHead";
import { useStore } from "@/zustand/store";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Klaso" },
    { name: "description", content: "Public educational results platform" },
  ];
};

export default function Component() {
  const userType = useStore((store) => store.userType);

  return (
    <div
      style={{
        backgroundColor: "var(--light-grey)",
        minHeight: "calc(100dvh - 56px)",
      }}
    >
      {userType === "teacher" && <ClassesHead />}
      <Classes />
      <Outlet />
    </div>
  );
}
