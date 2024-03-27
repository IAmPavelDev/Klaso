export type ClassType = {
  id: string;
  title: string;
  description: string;
  created: string;
  major: string;
  tasks: Array<string>;
  teacher: string;
  students: Array<string>;
};

export type CreateClassType = {
  title: string;
  description: string;
  major: string;
  teacher: string;
  students: Array<string>;
};
