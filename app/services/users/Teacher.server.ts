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

if (global.TeacherModel) {
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
    const teacher = await this.model.findOne({ email }).lean();

    if (!teacher) return;
    const { _id, password, ...teacherData } = teacher;

    return teacherData;
  }

  async getById(searchId: string): Promise<TeacherOmitPwd | undefined> {
    const teacher = await this.model.findOne({ id: searchId }).lean();

    if (!teacher) return;
    const { _id, password, ...teacherData } = teacher;

    return teacherData;
  }

  async create(data: CreateTeacherData): Promise<TeacherOmitPwd | undefined> {
    if (!data) {
      return;
    }
    if (!Object.values(data).some(Boolean)) {
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newTeacherData: TeacherType = {
      ...data,
      id: uuidv4(),
      classes: [],
      password: hashedPassword,
    };

    const { _id, password, ...newTeacher } = (
      await this.model.create(newTeacherData)
    ).toJSON();

    return newTeacher;
  }

  async update(
    id: string,
    newData: Partial<TeacherType>
  ): Promise<TeacherOmitPwd | undefined> {
    const teacherUpdated = await this.model
      .findByIdAndUpdate({ id }, newData)
      .lean();

    if (!teacherUpdated) return;

    const { _id, password, ...newTeacher } = teacherUpdated;

    return newTeacher;
  }

  async delete(id: string): Promise<TeacherOmitPwd | undefined> {
    const teacher = await this.model.findOneAndDelete({ id }).lean();
    if (!teacher) return;

    const { _id, password, ...teacherData } = teacher;

    return teacherData;
  }
}

const TeacherService = new Teacher(Model);

export default TeacherService;
