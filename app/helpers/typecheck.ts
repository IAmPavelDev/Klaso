import { CreateClassType } from "@/types/Class";
import { ResponseType, CreateResponseType } from "@/types/Response";
import { StudentOmitPwd } from "@/types/Student";
import { CreateTaskType, TaskType } from "@/types/Task";
import { TeacherOmitPwd } from "@/types/Teacher";

export const isStudentOmitPwd = (obj: any): obj is StudentOmitPwd => {
  return (
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "surname" in obj &&
    "fatherName" in obj &&
    "about" in obj &&
    "classes" in obj &&
    "responses" in obj &&
    "major" in obj &&
    "email" in obj
  );
};

export const isTeacherOmitPwd = (obj: any): obj is TeacherOmitPwd => {
  return (
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "surname" in obj &&
    "fatherName" in obj &&
    "about" in obj &&
    "email" in obj &&
    "classes" in obj
  );
};

export const isCreateClassType = (obj: any): obj is CreateClassType => {
  return (
    typeof obj === "object" &&
    "title" in obj &&
    "description" in obj &&
    "major" in obj &&
    "teacher" in obj &&
    "students" in obj
  );
};

export const isCreateTaskType = (obj: any): obj is CreateTaskType => {
  return (
    typeof obj === "object" &&
    "title" in obj &&
    "description" in obj &&
    "deadLine" in obj &&
    "class" in obj
  );
};

export const isTaskType = (obj: any): obj is TaskType => {
  return (
    typeof obj === "object" &&
    "id" in obj &&
    "title" in obj &&
    "description" in obj &&
    "created" in obj &&
    "deadLine" in obj &&
    "class" in obj &&
    "responses" in obj
  );
};

export const isCreateResponseType = (obj: any): obj is CreateResponseType => {
  return (
    typeof obj === "object" &&
    "title" in obj &&
    "description" in obj &&
    "attachments" in obj &&
    "task" in obj &&
    "student" in obj
  );
};

export const isResponseType = (obj: any): obj is ResponseType => {
  return (
    typeof obj === "object" &&
    "id" in obj &&
    "title" in obj &&
    "description" in obj &&
    "attachments" in obj &&
    "task" in obj &&
    "created" in obj &&
    "grade" in obj &&
    "student" in obj
  );
};
