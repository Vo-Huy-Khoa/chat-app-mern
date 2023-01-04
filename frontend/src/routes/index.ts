import config from "../configs";
import Message from '../pages/Message';
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login/login";
import Register from "../pages/Register";

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
  
  {
    path: configRoutes.login,
    component: Login,
    layout: null,
  },
  {
    path: configRoutes.register,
    component: Register,
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
