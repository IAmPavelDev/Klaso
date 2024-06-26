import { ClassType, CreateClassType } from "@/types/Class";
import mongoose from "@/services/db/db.server";
import { v4 as uuidv4 } from "uuid";
import TaskService from "../tasks/Tasks.server";

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

if (global.ClassModel) {
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

  async getAll(): Promise<Array<ClassType | undefined>> {
    const classes = await this.model.find({}).lean();

    return classes.map(
      (
        classInfo: mongoose.FlattenMaps<ClassType> & {
          _id?: mongoose.Types.ObjectId;
        }
      ): ClassType => {
        delete classInfo._id;
        return classInfo;
      }
    );
  }

  async getStudentClasses(studentId: string): Promise<Array<ClassType>> {
    const classes = await this.model
      .find({ students: studentId })
      .lean()
      .exec();
    return classes;
  }

  async getTeacherClasses(teacherId: string): Promise<Array<ClassType>> {
    const classes = await this.model.find({ teacher: teacherId }).lean().exec();
    return classes;
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
      created: new Date().toString(),
      tasks: [],
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
      .findOneAndUpdate({ id }, newData)
      .lean();

    if (!classUpdated) return;

    const { _id, ...newClass } = classUpdated;

    return newClass;
  }

  async pushTask(
    taskId: string,
    classId: string
  ): Promise<ClassType | undefined> {
    const classInfo = await this.model.findOne({ id: classId });

    if (!classInfo) return;

    classInfo.tasks.push(taskId);

    classInfo.save();

    const { _id, ...newClass } = classInfo;

    return newClass;
  }

  async removeTask(
    taskId: string,
    classId: string
  ): Promise<ClassType | undefined> {
    const classInfo = await this.model.findOne({ id: classId });

    if (!classInfo) return;

    classInfo.tasks = classInfo.tasks.filter((t) => t !== taskId);

    classInfo.save();

    const { _id, ...newClass } = classInfo;

    return newClass;
  }

  async delete(id: string): Promise<ClassType | undefined> {
    const classData = await this.model.findOneAndDelete({ id }).lean();
    if (!classData) return;

    for (const taskId of classData.tasks) {
      TaskService.update({ id: taskId }, { class: "" });
    }

    const { _id, ...classDataReturn } = classData;

    return classDataReturn;
  }
}

const ClassService = new Class(Model);

export default ClassService;
