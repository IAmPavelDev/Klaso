import mongoose from "@/services/db/db.server";
import { CreateTaskType, TaskType } from "@/types/Task";
import { v4 as uuidv4 } from "uuid";

const TaskSchema = new mongoose.Schema<TaskType>({
  id: String,
  title: String,
  description: String,
  created: Date,
  deadLine: String,
  class: String,
  responses: [String],
});

declare global {
  var TaskModel: mongoose.Model<TaskType>;
}

let Model: mongoose.Model<TaskType>;

if (global.TaskModel) {
  Model = global.TaskModel;
} else {
  Model = mongoose.model<TaskType>("Task", TaskSchema);
  global.TaskModel = Model;
}

class Task {
  model: mongoose.Model<TaskType>;

  constructor(Model: mongoose.Model<TaskType>) {
    this.model = Model;
  }

  async getAll(): Promise<Array<TaskType | undefined>> {
    const classes = await this.model.find({}).lean();

    return classes.map(
      (
        classInfo: mongoose.FlattenMaps<TaskType> & {
          _id?: mongoose.Types.ObjectId;
        }
      ): TaskType => {
        delete classInfo._id;
        return classInfo;
      }
    );
  }

  async getById(searchId: string): Promise<TaskType | undefined> {
    const classData = await this.model.findOne({ id: searchId }).lean();

    if (!classData) return;
    const { _id, ...classReturn } = classData;

    return classReturn;
  }

  async create(data: CreateTaskType): Promise<TaskType | undefined> {
    if (!data) {
      return;
    }
    if (!Object.values(data).some(Boolean)) {
      return;
    }

    const newClassData: TaskType = {
      ...data,
      id: uuidv4(),
      created: new Date().toString(),
      responses: [],
    };

    const { _id, ...newClass } = (
      await this.model.create(newClassData)
    ).toJSON();

    return newClass;
  }

  async update(
    id: string,
    newData: Partial<TaskType>
  ): Promise<TaskType | undefined> {
    const classUpdated = await this.model
      .findByIdAndUpdate({ id }, newData)
      .lean();

    if (!classUpdated) return;

    const { _id, ...newClass } = classUpdated;

    return newClass;
  }

  async delete(id: string): Promise<TaskType | undefined> {
    const classData = await this.model.findOneAndDelete({ id }).lean();
    if (!classData) return;

    const { _id, ...classDataReturn } = classData;

    return classDataReturn;
  }
}

const TaskService = new Task(Model);

export default TaskService;
