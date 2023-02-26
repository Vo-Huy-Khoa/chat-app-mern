import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "../sidebar";
import Notification from "../notification";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReceiverProvider,
  UserProvider,
  VisibilityContext,
} from "../../providers";
import { MessageProvider } from "../../providers";

const cx = classNames.bind(styles);

type Props = {
  children: JSX.Element;
};

const DefaultLayout: React.FC<Props> = ({ children }): any => {
  const navigate = useNavigate();
  const { isVisible } = useContext(VisibilityContext);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const token = sessionStorage.getItem("token") || "";
  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  }, [token]);

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
    <UserProvider>
      <ReceiverProvider>
        <MessageProvider>
          {isLargeScreen && (
            <div className={cx("container")}>
              <div className={cx("sidebar", "fixed")}>
                <Sidebar />
              </div>
              <div className={cx("content", "fixed")}>{children}</div>
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
                <div className={cx("content", "fixed")}>{children}</div>
              )}
              {isVisible === "notification" && (
                <div className={cx("notification", "fixed")}>
                  <Notification />
                </div>
              )}
            </div>
          )}
        </MessageProvider>
      </ReceiverProvider>
    </UserProvider>
  );
};

export default DefaultLayout;
