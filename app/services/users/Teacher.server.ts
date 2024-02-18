import {
  CreateTeacherData,
  TeacherOmitPwd,
  TeacherType,
} from "@/types/Teacher";
import mongoose from "../db/db.server";
import { v4 as uuidv4 } from "uuid";
import { FilterQuery } from "mongoose";
import bcrypt from "bcrypt";

const TeacherSchema = new mongoose.Schema<TeacherType>({
  id: String,
  password: String,
  name: String,
  surname: String,
  fatherName: String,
  email: String,
  classes: [String],
});

declare global {
  var TeacherModel: mongoose.Model<TeacherType>;
}

let Model: mongoose.Model<TeacherType>;

if (global.StudentModel) {
  Model = global.TeacherModel;
} else {
  Model = mongoose.model<TeacherType>("Teacher", TeacherSchema);
  global.TeacherModel = Model;
}

class Teacher {
  model: mongoose.Model<TeacherType>;

  constructor(Model: mongoose.Model<TeacherType>) {
    this.model = Model;
  }

  async verifyPassword(
    query: FilterQuery<TeacherOmitPwd>,
    password: string
  ): Promise<boolean> {
    const user = await this.model.findOne(query).lean();

    if (!user) return false;

    return bcrypt.compare(password, user.password);
  }

  async getByEmail(email: string): Promise<TeacherOmitPwd | undefined> {
    const student = await this.model.findOne({ email }).lean();

    if (!student) return;
    const { _id, password, ...studentData } = student;

    return studentData;
  }

  async getById(searchId: string): Promise<TeacherOmitPwd | undefined> {
    const student = await this.model.findOne({ id: searchId }).lean();

    if (!student) return;
    const { _id, password, ...studentData } = student;

    return studentData;
  }

  async create(data: CreateTeacherData): Promise<TeacherOmitPwd | undefined> {
    if (!data) {
      return;
    }
    if (!Object.values(data).some(Boolean)) {
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newStudentData: TeacherType = {
      ...data,
      id: uuidv4(),
      classes: [],
      password: hashedPassword,
    };

    const { _id, password, ...newStudent } = (
      await this.model.create(newStudentData)
    ).toJSON();

    return newStudent;
  }

  async update(
    id: string,
    newData: Partial<TeacherType>
  ): Promise<TeacherOmitPwd | undefined> {
    const studentUpdated = await this.model
      .findByIdAndUpdate({ id }, newData)
      .lean();

    if (!studentUpdated) return;

    const { _id, password, ...newStudent } = studentUpdated;

    return newStudent;
  }

  async delete(id: string): Promise<TeacherOmitPwd | undefined> {
    const student = await this.model.findOneAndDelete({ id }).lean();
    if (!student) return;

    const { _id, password, ...studentData } = student;

    return studentData;
  }
}

const TeacherService = new Teacher(Model);

export default TeacherService;
