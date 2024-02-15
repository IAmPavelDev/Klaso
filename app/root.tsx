import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyles from "./styles/global.css";
import resetCss from "./styles/reset.css";
import { Header } from "./components/Header";
import { useState } from "react";
import { Profile } from "./components/Profile";

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
    href: "https://fonts.googleapis.com/css2?family=Long+Cang&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap",
    rel: "stylesheet",
  },
];

export default function App() {
  const [profileState, setProfileState] = useState(false);
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
