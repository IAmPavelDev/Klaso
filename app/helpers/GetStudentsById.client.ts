import { StudentOmitPwd } from "@/types/Student";
import { isStudentOmitPwd } from "./typecheck";

export const GetStudents = async (
  studentsIds: string[]
): Promise<StudentOmitPwd[]> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const opts = {
    method: "POST",
    headers,
    body: JSON.stringify({ studentsIds }),
  };
  const data: unknown = await fetch("/student", opts).then((res) => res.json());

  if (
    data &&
    typeof data === "object" &&
    "students" in data &&
    Array.isArray(data.students) &&
    data.students.every(isStudentOmitPwd)
  ) {
    return data.students;
  }
  return [];
};
