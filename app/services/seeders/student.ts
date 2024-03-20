import { CreateStudentData } from "@/types/Student";
import StudentService from "../users/Student.server";

const data = [
  {
    password: "pwd",
    name: "Тарас",
    surname: "Петрович",
    fatherName: "Ігнатенко",
    courseStart: "2020",
    courseEnd: "2024",
    major: "Автоматизація",
    email: "test@gmail.com",
  },
] satisfies CreateStudentData[];

const randomize = (data: CreateStudentData): CreateStudentData => {
  const d = { ...data };
  d.name = d.name + Number((Math.random() * 10).toFixed(0));
  d.surname = d.surname + Number((Math.random() * 10).toFixed(0));
  d.fatherName = d.fatherName + Number((Math.random() * 10).toFixed(0));
  d.major = d.major + Number((Math.random() * 10).toFixed(0));
  d.email = d.email + Number((Math.random() * 10).toFixed(0));
  return d;
};

const SeedStudents = async () => {
  const seeds = data
    .map((d: CreateStudentData) => {
      return Array(10)
        .fill(1)
        .map(() => randomize(d));
    })
    .flat();

  for (const d of seeds) {
    await StudentService.create(d);
  }

  console.log("seeded");
};

SeedStudents();
