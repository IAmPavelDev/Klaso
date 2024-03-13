import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  console.log(id);

  return json(id);
};

export default function ClassPage() {
  const data = useLoaderData();
  return <>Class {data}</>;
}
