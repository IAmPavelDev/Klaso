import StudentService from "../users/Student.server";
import TeacherService from "../users/Teacher.server";

export const CredentialsLogin = async ({
  password,
  email,
}: {
  password: string;
  email: string;
}) => {
  const student = StudentService.getByEmail(email);
  const StudentPwdVerified = StudentService.verifyPassword({ email }, password);
  const teacher = TeacherService.getByEmail(email);
  const TeacherPwdVerified = TeacherService.verifyPassword({ email }, password);

  const [
    studentData,
    teacherData,
    isStudentPasswordValid,
    isTeacherPasswordValid,
  ] = await Promise.all([
    student,
    teacher,
    StudentPwdVerified,
    TeacherPwdVerified,
  ]);

  let userData;

  if (studentData) {
    if (!isStudentPasswordValid)
      return { status: "error", msg: "Password is invalid" };

    userData = studentData;
  } else if (teacherData) {
    if (!isTeacherPasswordValid)
      return { status: "error", msg: "Password is invalid" };

    userData = teacherData;
  }

  if (!userData)
    return { status: "error", msg: "User with such email not found" };

  return {
    status: "success",
    userId: userData.id,
  };
};
