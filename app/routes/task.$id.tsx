import { isTaskType } from "@/helpers/typecheck";
import ResponseService from "@/services/responses/Responses.server";
import TaskService from "@/services/tasks/Tasks.server";
import { ResponsePreviewType } from "@/types/Response";
import { TaskInfo } from "@/widgets/TaskInfo";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) return redirect("/");

  const taskData = await TaskService.getById(id);

  if (!isTaskType(taskData)) return redirect("/");

  const responsePrevs = await ResponseService.getByTaskId(
    taskData.id,
    "id title created"
  );

  if (
    !responsePrevs.every(
      (prev: any): prev is ResponsePreviewType =>
        "id" in prev && "title" in prev && "created" in prev
    )
  )
    return json({
      taskData,
      responsePrevs: [] as ResponsePreviewType[],
    });

  console.log(responsePrevs);

  return json({ taskData, responsePrevs });
};

export default function Task() {
  const { taskData, responsePrevs } = useLoaderData<typeof loader>();
  return <TaskInfo data={taskData} responsePrevs={responsePrevs} />;
}
