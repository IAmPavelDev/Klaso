import StudentService from "../users/Student.server";

export const CredentialsLogin = async ({
  password,
  email,
}: {
  password: string;
  email: string;
}) => {
  const user = StudentService.getStudentByEmail(email);
  const pwdVerified = StudentService.verifyPassword({ email }, password);

  const [userData, isPasswordValid] = await Promise.all([user, pwdVerified]);

  if (!userData)
    return { status: "error", msg: "User with such email not found" };

  if (!isPasswordValid)
    return { status: "error", msg: "Password is not valid" };

  return { status: "success", userId: userData.id };
};

export const CookieLogin = async () => {};
