import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "../sidebar";
import Notification from "../notification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProvider } from "../../providers";

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

  return (
    <UserProvider>
      <div className={cx("container")}>
        <div className={cx("sidebar", "fixed")}>
          <Sidebar />
        </div>
        <div className={cx("content", "fixed")}>{children}</div>
        <div className={cx("notification", "fixed")}>
          <Notification />
        </div>
      </div>
    </UserProvider>
  );
};

export default DefaultLayout;
