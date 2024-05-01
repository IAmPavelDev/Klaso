import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formdata = await request.formData();
  const file = formdata.get("file") as Blob;
  console.log(file);
  return json({});
};
