export type TaskType = {
  id: string;
  title: string;
  description: string;
  created: string;
  deadLine: string;
  class: string;
  responses: Array<string>;
};

export type CreateTaskType = {
  title: string;
  description: string;
  deadLine: string;
  class: string;
};
