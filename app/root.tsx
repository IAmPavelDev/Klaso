import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import globalStyles from "./styles/global.css";
import resetCss from "./styles/reset.css";
import { Header } from "./components/Header";
import { useState } from "react";
import { Profile } from "./components/Profiles";
import { getUserSession } from "./services/cookie/cookieStorage.server";
import StudentService from "./services/users/Student.server";
import { useStore } from "./zustand/store";
import { StudentOmitPwd } from "./types/Student";
import TeacherService from "./services/users/Teacher.server";
import { TeacherOmitPwd } from "./types/Teacher";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: resetCss },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Long+Cang&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=block",
    rel: "stylesheet",
  },
];

type userDataType = {
  user: TeacherOmitPwd | StudentOmitPwd;
  userType: "student" | "teacher";
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  const StudentQuery = StudentService.getById(userId);
  const TeacherQuery = TeacherService.getById(userId);

  const [student, teacher] = await Promise.all([StudentQuery, TeacherQuery]);

  const userData = {} as userDataType;

  if (student) {
    userData.user = student;
    userData.userType = "student";
  } else if (teacher) {
    userData.user = teacher;
    userData.userType = "teacher";
  }

  return Object.keys(userData).length ? json(userData) : null;
};

export default function App() {
  const [profileState, setProfileState] = useState(false);

  const [isUserLoaded, setState, clearState] = useStore((state) => [
    state.isUserLoaded,
    state.setState,
    state.clearState,
  ]);

  const loaderData: userDataType | null = useLoaderData<typeof loader>();

  if (loaderData && !isUserLoaded) {
    const { user, userType }: userDataType = loaderData;
    setState(user, userType);
  }

  if (!loaderData && isUserLoaded) clearState();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header profileState={profileState} setProfileState={setProfileState} />
        <Profile open={profileState} setIsOpen={setProfileState} />
        <div style={{ paddingTop: 56 }}>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
