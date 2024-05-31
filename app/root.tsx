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
  useLocation,
} from "@remix-run/react";
import globalStyles from "./styles/global.css";
import resetCss from "./styles/reset.css";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { getUserSession } from "./services/cookie/cookieStorage.server";
import StudentService from "./services/users/Student.server";
import { useStore } from "./zustand/store";
import { StudentOmitPwd } from "./types/Student";
import TeacherService from "./services/users/Teacher.server";
import { TeacherOmitPwd } from "./types/Teacher";
import { UserProfile } from "./widgets/UserProfile";
import useDimensions from "./hooks/useDimensions";
import { HideableAssideProvider } from "./components/HideableAssideWrapper";
import { withEmotionCache } from "@emotion/react";

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

const App = withEmotionCache(({ children, title }, emotionCache) => {
  const [profileState, setProfileState] = useState(false);

  const [
    isUserLoaded,
    setState,
    clearState,
    setIsLeftAssideFoldable,
    setLeftAssideState,
  ] = useStore((state) => [
    state.isUserLoaded,
    state.setState,
    state.clearState,
    state.setIsLeftAssideFoldable,
    state.setLeftAssideState,
  ]);

  const location = useLocation();
  const { width } = useDimensions();

  useEffect(() => {
    setProfileState(false);
    setLeftAssideState(false);
  }, [location.pathname]);

  useEffect(() => {
    setIsLeftAssideFoldable(width < 1380);
  }, [width]);

  const loaderData: userDataType | null = useLoaderData<typeof loader>();

  if (loaderData && !isUserLoaded) {
    const { user, userType }: userDataType = loaderData;
    setState(user, userType);
  }

  if (!loaderData && isUserLoaded) clearState();

  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <HideableAssideProvider>
          <Header
            profileState={profileState}
            setProfileState={setProfileState}
          />
          <UserProfile open={profileState} setIsOpen={setProfileState} />
          <div className="app">
            <Outlet />
          </div>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </HideableAssideProvider>
      </body>
    </html>
  );
});

export default App;
