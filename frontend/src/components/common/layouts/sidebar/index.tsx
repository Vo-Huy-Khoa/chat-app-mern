import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import Image from "../../../ui/Image";
import { NotificationIcon } from "../../../ui/Icon";
import {AccountItem, AccountMessage} from "../../../ui/AccountItem";

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
  react: "haha",
  message: "chat bot",
  time: "9:50",
};

const Sidebar = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header_heading")}>
          <Image
            width="50px"
            height="50px"
            src="https://bedental.vn/wp-content/uploads/2022/11/gai-xinh-nguc-bu-7.jpg"
          />
          <h1 className={cx("header_title")}>Vo Huy Khoa</h1>
        </div>
        <div className={cx("header_notification")}>
          <NotificationIcon width="50px" height="50px" />
          <span>1</span>
        </div>
      </div>

      <div className={cx("status")}>
        {/* <div className={cx("status_search")}>
          <input type="text" />
        </div> */}
        <div className={cx("status_doing")}>
          <span className={cx("status--title", "text-white")}>Favorites</span>
          <div className={cx("status_content")}>
            <AccountItem data={status} />
            <AccountItem data={status} />
            <AccountItem data={status} />
            <AccountItem data={status} />
          </div>
        </div>
      </div>
      <div className={cx("message")}>
        <AccountMessage data= {message} />
        <AccountMessage data= {message} />
        <AccountMessage data= {message} />
        <AccountMessage data= {message} />
        <AccountMessage data= {message} />
        <AccountMessage data= {message} />
      </div>
    </div>
  );
};

export default Sidebar;
