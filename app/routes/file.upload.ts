import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formdata = await request.formData();
  const filenames = Array.from(formdata.keys());
  return json({ hi: "hi" });
};
