import { isCreateResponseType } from "@/helpers/typecheck";
import { StudentGuard } from "@/services/guards/Student.server";
import ResponseService from "@/services/responses/Responses.server";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id: responseId } = params;

  if (!responseId) return redirect("/");

  const responseData = Object.fromEntries(await request.formData());

  console.log(responseData);

  if (!StudentGuard(request) || !isCreateResponseType(responseData))
    return redirect("/");

  const newResponse = await ResponseService.create(responseData);

  if (!newResponse || Object.keys(newResponse).length === 0)
    return redirect("/");

  return json({ status: "success" });
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id: responseId } = params;

  if (!responseId) return redirect("/");

  const responseInfo = await ResponseService.getById(responseId);

  if (!responseInfo || Object.keys(responseInfo).length === 0)
    return redirect("/");

  return json(responseInfo);
};

export default function Response() {
  const response = useLoaderData<typeof loader>();

  return <>{response.title}</>;
}
