import classNames from "classnames/bind";
import styles from "../assets/scss/DefaultLayout.module.scss";
import { Sidebar, Notification } from "../pages/dashboard";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { VisibilityContext } from "../providers";

import { routes } from "../routes";
const cx = classNames.bind(styles);

const Dashboard = () => {
  const { isVisible } = useContext(VisibilityContext);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 425);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      {isLargeScreen && (
        <div className={cx("container")}>
          <div className={cx("sidebar", "fixed")}>
            <Sidebar />
          </div>
          <div className={cx("content", "fixed")}>
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
          <div className={cx("notification", "fixed")}>
            <Notification />
          </div>
        </div>
      )}
      {!isLargeScreen && (
        <div className={cx("container")}>
          {isVisible === "sidebar" && (
            <div className={cx("sidebar", "fixed")}>
              <Sidebar />
            </div>
          )}

          {isVisible === "home" && (
            <div className={cx("content", "fixed")}>
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
          )}
          {isVisible === "notification" && (
            <div className={cx("notification", "fixed")}>
              <Notification />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { Dashboard };
