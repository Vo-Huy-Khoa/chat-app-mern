import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import AccountItem from "../../../ui/AccountItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
    status: 'yes'
  };

const message = {
    avatar:
      "https://cdn.24h.com.vn/upload/3-2021/images/2021-09-21/anh-2-1632216610-256-width650height867.jpg",
    name: "Anh Thy",
    username: "khoavh",
    content: 'chat bot'
  };

const Sidebar = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("profile")}>
        <AccountItem data={profile} />
      </div>
      <div className={cx("search")}>
        <form className={cx('search_form')} action="">
          <FontAwesomeIcon className={cx('search_icon')} icon={faSearch} />
          <input type="text" placeholder="People, group and messages" />
          <FontAwesomeIcon className={cx('search_icon')} icon={faSearch} />
          <input type="hidden" />
        </form>
      </div>
      <div className={cx("message-status")}>
        <AccountItem data={status} />
        <AccountItem data={status} />
        <AccountItem data={status} />
        <AccountItem data={status} />
      </div>
      <div className={cx("message-chat")}>
        <AccountItem data={message} />
        <AccountItem data={message} />
        <AccountItem data={message} />
        <AccountItem data={message} />
        <AccountItem data={message} />
        <AccountItem data={message} />
      </div>
    </div>
  );
};

export default Sidebar;
