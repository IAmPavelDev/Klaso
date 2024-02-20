import { ClassType } from "@/types/Class";
import { LoaderFunctionArgs } from "@remix-run/node";
import { FC } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {};

export const ClassCard: FC<{ id: string }> = ({ id }) => {
  return <></>;
};
