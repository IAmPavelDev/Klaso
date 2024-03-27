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
  const students: unknown = await fetch("/student", opts).then((res) =>
    res.json()
  );
  if (Array.isArray(students) && students.every(isStudentOmitPwd))
    return students;
  return [];
};
