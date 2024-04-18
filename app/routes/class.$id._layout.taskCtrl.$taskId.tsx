import { isCreateTaskType } from "@/helpers/typecheck";
import ClassService from "@/services/classes/Classes.server";
import { getUserSession } from "@/services/cookie/cookieStorage.server";
import { TeacherGuard } from "@/services/guards/Teacher.server";
import TaskService from "@/services/tasks/Tasks.server";
import { CreateTaskType, TaskType } from "@/types/Task";
import { TaskForm } from "@/widgets/Forms/Task";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id: classId, taskId } = params;

  if (!classId) return redirect("/");

  if (!taskId) return redirect("/class/" + classId);

  const data = Object.fromEntries(await request.formData());

  if (!TeacherGuard(request)) return redirect("/class/" + classId);

  const taskData = {
    ...data,
    class: classId,
  };

  if (!isCreateTaskType(taskData)) return redirect("/class/" + classId);

  const newTask = await TaskService.create(taskData);

  if (!newTask || Object.keys(newTask).length === 0)
    return redirect("/class/" + classId);

  const newClass = await ClassService.pushTask(newTask.id, classId);

  if (!newClass || Object.keys(newClass).length === 0)
    return redirect("/class/" + classId);

  return redirect("/class/" + classId);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
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
