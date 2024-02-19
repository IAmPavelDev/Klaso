import { CreateTeacherData } from "@/types/Teacher";
import { CreateStudentData } from "../../types/Student";
import StudentService from "../users/Student.server";
import TeacherService from "../users/Teacher.server";

export const RegTeacherService = async (userData: CreateTeacherData) => {
  if (await TeacherService.getByEmail(userData.email))
    return { status: "error", msg: "User with this email is already exist" };

  const newUser = await TeacherService.create(userData);

  if (!newUser) return { status: "error", msg: "Unknown error" };

  return { status: "success", userId: newUser.id };
};

export const RegStudentService = async (userData: CreateStudentData) => {
  if (await StudentService.getStudentByEmail(userData.email))
    return { status: "error", msg: "User with this email is already exist" };

  const newUser = await StudentService.createStudent(userData);

  if (!newUser) return { status: "error", msg: "Unknown error" };

  return { status: "success", userId: newUser.id };
};
