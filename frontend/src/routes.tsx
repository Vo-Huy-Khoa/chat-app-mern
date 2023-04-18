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

export const API = {
  SIGN_IN: "login",
  SIGN_UP: "register",
  LOGOUT: "logout",
  PROFILE: "user/profile/",
  SEARCH: "user/search",
  USER: "users",
  MESSAGES: "listMessage",
  MESSAGE: "message",
  CREATE_MESSAGE: "createMessage",
};
