import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "../layouts/sidebar";
import Notification from "../layouts/notification";

const cx = classNames.bind(styles);

type Props = {
  children: JSX.Element;
};

const DefaultLayout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className={cx("container")}>
      <div className={cx("sidebar", "fixed")}>
        <Sidebar />
      </div>
      <div className={cx("content", "fixed")}>{children}</div>
      <div className={cx("notification", "fixed")}>
        <Notification />
      </div>
    </div>
  );
};

export default DefaultLayout;
