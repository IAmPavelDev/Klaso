export type Student = {
  id: string;
  password: string;
  name: string;
  surname: string;
  fatherName: string;
  about: string;
  classes: Array<string>;
  responses: Array<string>;
  major: string;
  email: string;
};

export type StudentOmitPwd = Omit<Student, "password">;

export interface CreateStudentData {
  password: string;
  name: string;
  surname: string;
  fatherName: string;
  about: string;
  major: string;
  email: string;
}
