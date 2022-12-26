import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import Image from "../../../ui/Image";

const cx = classNames.bind(styles);

const profile = {
  avatar:
    "https://bedental.vn/wp-content/uploads/2022/11/nguoi-mau-Shin-Jae-Eun.jpg",
  name: "vo huy Khoa",
  username: "khoavh",
};

const status = {
  avatar:
    "https://cdn.24h.com.vn/upload/3-2021/images/2021-09-21/anh-2-1632216610-256-width650height867.jpg",
  name: "Anh Thy",
  username: "khoavh",
  status: "yes",
};

const message = {
  avatar:
    "https://cdn.24h.com.vn/upload/3-2021/images/2021-09-21/anh-2-1632216610-256-width650height867.jpg",
  name: "Anh Thy",
  username: "khoavh",
  message: "chat bot",
  time: "9:50",
};

const Sidebar = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <Image />
        <h1 className={cx("header_heading")}></h1>
        <div className={cx("header_notification")}></div>
      </div>

      <div className={cx("status")}>
        <div className={cx("status_search")}>
          <input type="text" />
        </div>
      </div>
      <div className={cx("message")}></div>
    </div>
  );
};

export default Sidebar;
