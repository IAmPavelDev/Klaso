import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { RegistrationForm } from "@/widgets/Forms/RegistrationForm";
import { RegService } from "@/services/auth/reg.server";
import { CreateStudentData } from "@/types/Student";
import { createUserSession } from "@/services/cookie/cookieStorage.server";

const checkIsObjValid = (obj: any): obj is CreateStudentData => {
  return (
    "email" in obj &&
    "password" in obj &&
    "name" in obj &&
    "surname" in obj &&
    "fatherName" in obj &&
    "major" in obj &&
    "courseStart" in obj &&
    "courseEnd" in obj
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: "Klaso | Registration" },
    { name: "description", content: "Public educational results platform" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const entities = formData.entries();
  const raw = {} as { [key: string]: string };
  let data: [string, string] = entities.next().value;

  while (Boolean(data)) {
    raw[data[0]] = data[1];
    data = entities.next().value;
  }

  if (!checkIsObjValid(raw)) return redirect("/reg");

  const regResponse = await RegService(raw);

  if (!regResponse || regResponse.status !== "success" || !regResponse.userId)
    return redirect("/reg");

  return redirect("/", {
    headers: await createUserSession(regResponse.userId),
  });
};

export default function Registration() {
  return <RegistrationForm action="/reg" method="POST" />;
}
