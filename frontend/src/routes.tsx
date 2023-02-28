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
