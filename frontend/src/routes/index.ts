import config from "../configs";
import Home from "../pages/Home/home";

const configRoutes = config.routes;

const publicRoutes = [
  {
    path: configRoutes.home,
    component: Home,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: configRoutes.message,
    component: Home,
    layout: null,
  },
  {
    path: configRoutes.upload,
    component: Home,
    layout: null,
  },
];

export { publicRoutes, privateRoutes };
