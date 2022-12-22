import config from "../configs";
import Message from '../pages/Message';
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import DefaultLayout from "../components/common/DefaultLayout";

const configRoutes = config.routes;

const publicRoutes = [
  {
    path: configRoutes.home,
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: configRoutes.message,
    component: Message,
    layout: DefaultLayout,
  },
  {
    path: configRoutes.profile,
    component: Profile,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: configRoutes.message,
    component: null,
    layout: null,
  }
];

export { publicRoutes, privateRoutes };
