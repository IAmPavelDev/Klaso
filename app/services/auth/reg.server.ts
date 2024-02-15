import { CreateStudentData } from "../../types/Student";
import StudentService from "../users/Student.server";

export const RegService = async (userData: CreateStudentData) => {
  if (await StudentService.getStudentByEmail(userData.email))
    return { status: "error", msg: "User with this email is already exist" };

  const newUser = await StudentService.createStudent(userData);

  if (!newUser) return { status: "error", msg: "Unknown error" };

  return { status: "success", userId: newUser.id };
};
