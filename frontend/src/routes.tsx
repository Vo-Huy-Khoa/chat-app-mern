import { Home } from "./pages/dashboard";
import { Login, Register } from "./pages/auth";

export const routes = [
  {
    layout: "auth",
    pages: [
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Register />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
];

export const API_URL = {
  SIGN_IN: "auth/login",
  SIGN_UP: "auth/register",
  LOGOUT: "auth/logout",
  REFRESH_TOKEN: "auth/refreshToken",
  PROFILE: "user/profile/",
  SEARCH: "user/search",
  USER: "user/",
  MESSAGES: "message/list",
  MESSAGE: "message/find",
  CREATE_MESSAGE: "message/create",
};
