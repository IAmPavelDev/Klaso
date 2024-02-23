import { CreateClassType } from "@/types/Class";
import { StudentOmitPwd } from "@/types/Student";
import { TeacherOmitPwd } from "@/types/Teacher";

export const isStudentOmitPwd = (obj: any): obj is StudentOmitPwd => {
  return (
    "id" in obj &&
    "name" in obj &&
    "surname" in obj &&
    "fatherName" in obj &&
    "courseStart" in obj &&
    "courseEnd" in obj &&
    "classes" in obj &&
    "tasksTodo" in obj &&
    "tasksDone" in obj &&
    "major" in obj &&
    "email" in obj
  );
};

export const isTeacherOmitPwd = (obj: any): obj is TeacherOmitPwd => {
  return (
    "id" in obj &&
    "name" in obj &&
    "surname" in obj &&
    "fatherName" in obj &&
    "email" in obj &&
    "classes" in obj
  );
};

export const isCreateClassType = (obj: any): obj is CreateClassType => {
  return (
    "title" in obj && "description" in obj && "major" in obj && "teacher" in obj
  );
};
