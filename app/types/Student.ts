export type Student = {
  id: string;
  password: string;
  name: string;
  surname: string;
  fatherName: string;
  courseStart: string;
  courseEnd: string;
  classes: Array<string>;
  tasksTodo: Array<string>;
  tasksDone: Array<string>;
  major: string;
  year: number;
  email: string;
};

export type StudentOmitPwd = Omit<Student, "password" | "year">;

export interface CreateStudentData {
  password: string;
  name: string;
  surname: string;
  fatherName: string;
  courseStart: string;
  courseEnd: string;
  major: string;
  email: string;
}
