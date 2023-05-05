import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import { Sidebar, Notification } from "../pages/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";

const Dashboard = () => {
  const isVisible = useSelector((state: RootState) => state.currentVisibility);

  return (
    <div>
      <div className="flex w-full h-full">
        <div className={`fixed bg-primary h-full custom-w-sidebar ${isVisible === "sidebar" ? "sm:block sm:w-full" : "sm:hidden"}`}>
          <Sidebar />
        </div>
        <div className={`fixed bg-black h-full custom-w-home sm:w-full sm:left-0 ${isVisible === "home" ? "sm:block sm:w-full" : "sm:hidden"}`}>
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
        <div className={`fixed right-0 custom-w-notification h-full bg-primary ${isVisible === "notification" ? "sm:block sm:w-full" : "sm:hidden"}`}>
          <Notification />
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
