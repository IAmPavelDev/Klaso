import { ClassType, CreateClassType } from "@/types/Class";
import mongoose from "@/services/db/db.server";
import { v4 as uuidv4 } from "uuid";

const ClassSchema = new mongoose.Schema<ClassType>({
  id: String,
  title: String,
  description: String,
  created: Date,
  major: String,
  tasks: [String],
  teacher: String,
  students: [String],
});

declare global {
  var ClassModel: mongoose.Model<ClassType>;
}

let Model: mongoose.Model<ClassType>;

if (global.TeacherModel) {
  Model = global.ClassModel;
} else {
  Model = mongoose.model<ClassType>("Class", ClassSchema);
  global.ClassModel = Model;
}

class Class {
  model: mongoose.Model<ClassType>;

  constructor(Model: mongoose.Model<ClassType>) {
    this.model = Model;
  }

  async getById(searchId: string): Promise<ClassType | undefined> {
    const classData = await this.model.findOne({ id: searchId }).lean();

    if (!classData) return;
    const { _id, ...classReturn } = classData;

    return classReturn;
  }

  async create(data: CreateClassType): Promise<ClassType | undefined> {
    if (!data) {
      return;
    }
    if (!Object.values(data).some(Boolean)) {
      return;
    }

    const newClassData: ClassType = {
      ...data,
      id: uuidv4(),
      created: new Date(),
      tasks: [],
      students: [],
    };

    const { _id, ...newClass } = (
      await this.model.create(newClassData)
    ).toJSON();

    return newClass;
  }

  async update(
    id: string,
    newData: Partial<ClassType>
  ): Promise<ClassType | undefined> {
    const classUpdated = await this.model
      .findByIdAndUpdate({ id }, newData)
      .lean();

    if (!classUpdated) return;

    const { _id, ...newClass } = classUpdated;

    return newClass;
  }

  async delete(id: string): Promise<ClassType | undefined> {
    const classData = await this.model.findOneAndDelete({ id }).lean();
    if (!classData) return;

    const { _id, ...classDataReturn } = classData;

    return classDataReturn;
  }
}

const ClassService = new Class(Model);

export default ClassService;
