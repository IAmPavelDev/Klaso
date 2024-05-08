export type TeacherType = {
  id: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  fatherName: string;
  about: string;
  classes: Array<string>;
};

export type CreateTeacherData = Omit<TeacherType, "id" | "classes">;

export type TeacherOmitPwd = Omit<TeacherType, "password">;
