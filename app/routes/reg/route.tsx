import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { RegistrationForm } from "@/widgets/Forms/Reg";
import {
  RegStudentService,
  RegTeacherService,
} from "@/services/auth/reg.server";
import { CreateStudentData } from "@/types/Student";
import { createUserSession } from "@/services/cookie/cookieStorage.server";
import { CreateTeacherData } from "@/types/Teacher";

const checkStudentData = (obj: any): obj is CreateStudentData => {
  return (
    "email" in obj &&
    "password" in obj &&
    "name" in obj &&
    "surname" in obj &&
    "fatherName" in obj &&
    "major" in obj &&
    "about" in obj
  );
};
const checkTeacherData = (obj: any): obj is CreateTeacherData => {
  return (
    "email" in obj &&
    "password" in obj &&
    "name" in obj &&
    "surname" in obj &&
    "fatherName" in obj &&
    "about" in obj
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: "Klaso | Registration" },
    { name: "description", content: "Public educational results platform" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { userType, ...RegBody } = Object.fromEntries(
    (await request.formData()).entries()
  );

  let regResponse:
    | {
        status: string;
        msg: string;
        userId?: undefined;
      }
    | {
        status: string;
        userId: string;
        msg?: undefined;
      }
    | undefined;

  if (userType === "student") {
    if (!checkStudentData(RegBody)) return redirect("/reg");

    regResponse = await RegStudentService(RegBody);
  } else if (userType === "teacher") {
    if (!checkTeacherData(RegBody)) return redirect("/reg");

    regResponse = await RegTeacherService(RegBody);
  }
  if (!regResponse || regResponse.status !== "success" || !regResponse.userId)
    return redirect("/reg");

  return redirect("/", {
    headers: await createUserSession(regResponse.userId),
  });
};

export default function Registration() {
  return <RegistrationForm action="/reg" method="POST" />;
}
