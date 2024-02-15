export type Student = {
  id: string;
  password: string;
  name: string;
  surname: string;
  fatherName: string;
  courseStart: Date;
  courseEnd: Date;
  classes: Array<string>;
  tasksTodo: Array<string>;
  tasksDone: Array<string>;
  major: string;
  year: number;
  email: string;
};

export type StudentOmitPwd = Omit<Student, "password">;

export interface CreateStudentData {
  password: string;
  name: string;
  surname: string;
  fatherName: string;
  courseStart: Date;
  courseEnd: Date;
  major: string;
  email: string;
}
