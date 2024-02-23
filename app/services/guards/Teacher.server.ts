import { getUserSession } from "../cookie/cookieStorage.server";
import TeacherService from "../users/Teacher.server";

export const TeacherGuard = async (request: Request): Promise<boolean> => {
  const session = await getUserSession(request);

  const userId = session.get("userId");

  const teacher = await TeacherService.getById(userId);

  return Boolean(Object.keys(teacher ?? {}).length);
};
