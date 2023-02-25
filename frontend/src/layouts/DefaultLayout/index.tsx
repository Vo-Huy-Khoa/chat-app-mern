import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "../sidebar";
import Notification from "../notification";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProvider, VisibilityContext } from "../../providers";
import { MessageProvider } from "../../providers";

const cx = classNames.bind(styles);

type Props = {
  children: JSX.Element;
};

const DefaultLayout: React.FC<Props> = ({ children }): any => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") || "";
  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  }, [token]);
  const { isVisible } = useContext(VisibilityContext);

  return (
    <UserProvider>
      <MessageProvider>
        <div className={cx("container")}>
          <div
            className={cx(
              "sidebar",
              "fixed",
              isVisible === "sidebar" ? "show" : "hide"
            )}
          >
            <Sidebar />
          </div>

          <div
            className={cx(
              "content",
              "fixed",
              isVisible === "home" ? "show" : "hide"
            )}
          >
            {children}
          </div>
          <div
            className={cx(
              "notification",
              "fixed",
              isVisible === "notification" ? "show" : "hide"
            )}
          >
            <Notification />
          </div>
        </div>
      </MessageProvider>
    </UserProvider>
  );
};

export default DefaultLayout;
