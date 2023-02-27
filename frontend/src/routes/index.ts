import { Home } from "../pages/dashboard";
import { DefaultLayout } from "../layouts";
import Login from "../pages/auth/sign-in";
import Register from "../pages/auth/sign-up";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    component: Login,
    layout: null,
  },
  {
    path: "/register",
    component: Register,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: "/message",
    component: null,
    layout: null,
  },
];

export { publicRoutes, privateRoutes };
