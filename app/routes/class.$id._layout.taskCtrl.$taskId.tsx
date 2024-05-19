import { isCreateTaskType } from "@/helpers/typecheck";
import ClassService from "@/services/classes/Classes.server";
import { TeacherGuard } from "@/services/guards/Teacher.server";
import TaskService from "@/services/tasks/Tasks.server";
import { TaskType } from "@/types/Task";
import { TaskForm } from "@/widgets/Forms/Task";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const UpdateTask = async (
  formData: FormData,
  classId: string,
  taskId: string
) => {
  const { intent, ...data } = Object.fromEntries(formData);

  const updatedTask = await TaskService.update({ id: taskId }, data);

  if (!updatedTask || Object.keys(updatedTask).length === 0)
    return redirect("/class/" + classId);

  return redirect("/task/" + taskId);
};

const CreateTask = async (formData: FormData, classId: string) => {
  const { intent, ...data } = Object.fromEntries(formData);

  const taskData = {
    ...data,
    class: classId,
  };

  if (!isCreateTaskType(taskData)) return redirect("/class/" + classId);

  const newTask = await TaskService.create(taskData);

  if (!newTask || Object.keys(newTask).length === 0)
    return redirect("/class/" + classId);

  const newClass = await ClassService.pushTask(newTask.id, classId);

  if (!newClass || Object.keys(newClass).length === 0) return redirect("/");

  return redirect("/task/" + newTask.id);
};

const DeleteTask = async (classId: string, taskId: string) => {
  const task = await TaskService.getById(taskId);
  if (task && task.responses.length > 0) return redirect("/task/" + taskId);

  const deletedTask = await TaskService.delete(taskId);

  if (!deletedTask || Object.keys(deletedTask).length === 0)
    return redirect("/class/" + classId);

  const newClass = await ClassService.removeTask(taskId, classId);

  if (!newClass || Object.keys(newClass).length === 0) return redirect("/");

  return redirect("/class/" + classId);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  if (!(await TeacherGuard(request))) return redirect("/", 403);

  const { id: classId, taskId } = params;

  if (!classId) return redirect("/");

  if (!taskId) return redirect("/class/" + classId);

  const formData = await request.formData();

  const { intent } = Object.fromEntries(formData);

  if (intent === "create") {
    return CreateTask(formData, classId);
  }

  if (intent === "update") {
    return UpdateTask(formData, classId, taskId);
  }

  if (intent === "delete") {
    return DeleteTask(classId, taskId);
  }
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const isTeacher = await TeacherGuard(request);

  if (!isTeacher) return redirect("/", 403);

  const { id: classId, taskId } = params;

  if (!classId) return redirect("/");

  if (!taskId) return redirect("/class/" + classId);

  const initialData = {
    id: "new",
    title: "",
    description: "",
    created: "",
    deadLine: "",
    class: classId,
    responses: [],
  } satisfies TaskType;

  if (taskId === "new") {
    return json(initialData);
  }

  const taskInfo = await TaskService.getById(taskId);

  if (taskInfo) {
    return json(taskInfo);
  }

  return json(initialData);
};

export default function TaskCtrl() {
  const taskInfo = useLoaderData<typeof loader>();

  return <TaskForm taskInfo={taskInfo} />;
}
