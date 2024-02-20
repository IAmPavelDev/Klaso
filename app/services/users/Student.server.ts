import mongoose from "../db/db.server";
import {
  CreateStudentData,
  StudentOmitPwd,
  Student as StudentType,
} from "@/types/Student";
import bcrypt from "bcrypt";
import { FilterQuery } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const StudentSchema = new mongoose.Schema<StudentType>({
  id: String,
  password: String,
  name: String,
  surname: String,
  fatherName: String,
  email: String,
  courseStart: String,
  courseEnd: String,
  classes: [String],
  major: String,
  tasksTodo: [String],
  tasksDone: [String],
});

declare global {
  var StudentModel: mongoose.Model<StudentType>;
}

let Model: mongoose.Model<StudentType>;

if (global.StudentModel) {
  Model = global.StudentModel;
} else {
  Model = mongoose.model<StudentType>("Student", StudentSchema);
  global.StudentModel = Model;
}

class Student {
  model: mongoose.Model<StudentType>;
  constructor(model: mongoose.Model<StudentType>) {
    this.model = model;
  }

  async verifyPassword(
    query: FilterQuery<StudentOmitPwd>,
    password: string
  ): Promise<boolean> {
    const user = await this.model.findOne(query).lean();

    if (!user) return false;

    return bcrypt.compare(password, user.password);
  }

  async getByEmail(email: string): Promise<StudentOmitPwd | undefined> {
    const student = await this.model.findOne({ email }).lean();

    if (!student) return;
    const { _id, password, ...studentData } = student;

    return studentData;
  }

  async getById(searchId: string): Promise<StudentOmitPwd | undefined> {
    const student = await this.model.findOne({ id: searchId }).lean();

    if (!student) return;
    const { _id, password, ...studentData } = student;

    return studentData;
  }

  async create(data: CreateStudentData): Promise<StudentOmitPwd | undefined> {
    if (!data) {
      return;
    }
    if (!Object.values(data).some(Boolean)) {
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newStudentData: StudentType = {
      ...data,
      id: uuidv4(),
      classes: [],
      tasksTodo: [],
      tasksDone: [],
      year: new Date().getFullYear() - Number(data.courseStart),
      password: hashedPassword,
    };

    const { _id, password, ...newStudent } = (
      await this.model.create(newStudentData)
    ).toJSON();

    return newStudent;
  }

  async update(
    id: string,
    newData: Partial<StudentType>
  ): Promise<StudentOmitPwd | undefined> {
    const studentUpdated = await this.model
      .findByIdAndUpdate({ id }, newData)
      .lean();

    if (!studentUpdated) return;

    const { _id, password, ...newStudent } = studentUpdated;

    return newStudent;
  }

  async delete(id: string): Promise<StudentOmitPwd | undefined> {
    const student = await this.model.findOneAndDelete({ id }).lean();
    if (!student) return;

    const { _id, password, ...studentData } = student;

    return studentData;
  }
}

const StudentService = new Student(Model);

export default StudentService;
