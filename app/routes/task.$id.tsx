import { isTaskType } from "@/helpers/typecheck";
import TaskService from "@/services/tasks/Tasks.server";
import { TaskInfo } from "@/widgets/TaskInfo";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) return redirect("/");

  const taskData = await TaskService.getById(id);

  if (!isTaskType(taskData)) return redirect("/");

  return json(taskData);
};

export default function Task() {
  const taskData = useLoaderData<typeof loader>();
  return <TaskInfo data={taskData} />;
}
