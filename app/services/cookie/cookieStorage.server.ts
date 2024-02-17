import { createCookieSessionStorage, redirect } from "@remix-run/node";

const session_key = process.env.SESSION_KEY;

if (!session_key) throw new Error("Set SESSION_KEY");

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "Klaso",
      secure: process.env.NODE_ENV === "production",
      secrets: [session_key],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

export const createUserSession = async (
  userId: string,
  headers = new Headers()
) => {
  const session = await getSession();
  session.set("userId", userId);
  headers.set("Set-Cookie", await commitSession(session));
  return headers;
};

export const getUserSession = (request: Request) =>
  getSession(request.headers.get("Cookie"));

export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
