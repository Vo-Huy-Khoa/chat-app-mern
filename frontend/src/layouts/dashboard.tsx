import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import { Sidebar, Notification } from "../pages/dashboard";

const Dashboard = () => {
  return (
    <div>
      <div className="flex w-full h-full">
        <div className="fixed bg-primary h-full custom-w-sidebar sm:hidden">
          <Sidebar />
        </div>
        <div className="fixed bg-black h-full custom-w-home sm:w-full sm:left-0">
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
        <div className="fixed right-0 custom-w-notification h-full bg-primary sm:hidden">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
