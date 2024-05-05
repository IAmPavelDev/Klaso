export type ResponseType = {
  id: string;
  title: string;
  description: string;
  attachments: string[];
  task: string;
  student: string;
  created: string;
  grade: number;
};

export type CreateResponseType = {
  title: string;
  description: string;
  attachments: string[];
  task: string;
  student: string;
};

export type ResponsePreviewType = {
  id: string;
  title: string;
  created: string;
};
