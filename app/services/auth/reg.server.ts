import { CreateTeacherData } from "@/types/Teacher";
import { CreateStudentData } from "../../types/Student";
import StudentService from "../users/Student.server";
import TeacherService from "../users/Teacher.server";

const isUserExist = async (email: string): Promise<boolean> => {
  const isTeacherExist = TeacherService.getByEmail(email);
  const isStudentExist = StudentService.getByEmail(email);

  const results = await Promise.all([isStudentExist, isTeacherExist]);

  return Boolean(
    (!!results[0] && Object.keys(results[0]).length) ||
      (!!results[1] && Object.keys(results[1]).length)
  );
};

export const RegTeacherService = async (userData: CreateTeacherData) => {
  if (await isUserExist(userData.email))
    return { status: "error", msg: "User with this email is already exist" };

  const newUser = await TeacherService.create(userData);

  if (!newUser) return { status: "error", msg: "Unknown error" };

  return { status: "success", userId: newUser.id };
};

export const RegStudentService = async (userData: CreateStudentData) => {
  if (await isUserExist(userData.email))
    return { status: "error", msg: "User with this email is already exist" };

  const newUser = await StudentService.create(userData);

  if (!newUser) return { status: "error", msg: "Unknown error" };

  return { status: "success", userId: newUser.id };
};
