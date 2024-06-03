import mongoose from "@/services/db/db.server";
import { v4 as uuidv4 } from "uuid";
import { CreateResponseType, ResponseType } from "../../types/Response";
import { FilterQuery, ProjectionType } from "mongoose";

const ResponseSchema = new mongoose.Schema<ResponseType>({
  id: String,
  title: String,
  description: String,
  created: Date,
  attachments: [String],
  task: String,
  student: String,
  grade: String,
});

declare global {
  var ResponseModel: mongoose.Model<ResponseType>;
}

let Model: mongoose.Model<ResponseType>;

if (global.ResponseModel) {
  Model = global.ResponseModel;
} else {
  Model = mongoose.model<ResponseType>("Response", ResponseSchema);
  global.ResponseModel = Model;
}

class Response {
  model: mongoose.Model<ResponseType>;

  constructor(Model: mongoose.Model<ResponseType>) {
    this.model = Model;
  }

  async getAll(
    ids?: string[],
    select?: ProjectionType<ResponseType>
  ): Promise<ResponseType[] | undefined> {
    const responses = await this.model.find({ id: ids }, select).lean();

    return responses.map(
      (
        responseInfo: mongoose.FlattenMaps<ResponseType> & {
          _id?: mongoose.Types.ObjectId;
        }
      ): ResponseType => {
        delete responseInfo._id;
        return responseInfo;
      }
    );
  }

  async getByTaskId(
    taskId: string,
    select?: ProjectionType<ResponseType>,
    filter?: FilterQuery<ResponseType>
  ): Promise<Array<ResponseType | Partial<ResponseType> | undefined>> {
    const responses = await this.model
      .find({ task: taskId, ...(filter ?? {}) }, select)
      .lean();

    return responses.map(
      (
        responseInfo: mongoose.FlattenMaps<ResponseType> & {
          _id?: mongoose.Types.ObjectId;
        }
      ): ResponseType => {
        delete responseInfo._id;
        return responseInfo;
      }
    );
  }

  async getById(searchId: string): Promise<ResponseType | undefined> {
    const responseData = await this.model.findOne({ id: searchId }).lean();

    if (!responseData) return;
    const { _id, ...responseReturn } = responseData;

    return responseReturn;
  }

  async create(data: CreateResponseType): Promise<ResponseType | undefined> {
    if (!data) {
      return;
    }
    if (!Object.values(data).some(Boolean)) {
      return;
    }

    const newResponseData: ResponseType = {
      ...data,
      id: uuidv4(),
      created: new Date().toString(),
      attachments: [],
      grade: 0,
    };

    const { _id, ...newResponse } = (
      await this.model.create(newResponseData)
    ).toJSON();

    return newResponse;
  }

  async update(
    filter: FilterQuery<ResponseType>,
    newData: Partial<ResponseType>
  ): Promise<ResponseType | undefined> {
    const responseUpdated = await this.model
      .findOneAndUpdate(filter, newData)
      .lean();

    if (!responseUpdated) return;

    const { _id, ...newResponse } = responseUpdated;

    return newResponse;
  }

  async delete(id: string): Promise<ResponseType | undefined> {
    const responseData = await this.model.findOneAndDelete({ id }).lean();
    if (!responseData) return;

    const { _id, ...responseDataReturn } = responseData;

    return responseDataReturn;
  }
}

const ResponseService = new Response(Model);

export default ResponseService;
