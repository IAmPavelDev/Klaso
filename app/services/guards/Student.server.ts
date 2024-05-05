import { getUserSession } from "../cookie/cookieStorage.server";
import StudentService from "../users/Student.server";

export const StudentGuard = async (request: Request): Promise<boolean> => {
  const session = await getUserSession(request);

  const userId = session.get("userId");

  const student = await StudentService.getById(userId);

  return Boolean(Object.keys(student ?? {}).length);
};
