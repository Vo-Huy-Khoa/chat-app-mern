import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import Image from "../../components/Image";
import { NotificationIcon } from "../../components/Icon";
import { AccountItem, AccountMessage } from "../../components/AccountItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles);

// const profile = {
//   avatar:
//     "https://bedental.vn/wp-content/uploads/2022/11/nguoi-mau-Shin-Jae-Eun.jpg",
//   name: "vo huy Khoa",
//   username: "khoavh",
// };

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
  const token = sessionStorage.getItem("token") || "";
  const user = sessionStorage.getItem("user") || "";
  const id = JSON.parse(user).id;

  const [currentUser, setcurrentUser] = useState() || "";

  console.table( currentUser);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Beaer ${token}`,
  };
  useEffect(() => {
    axios
      .get(`api/user/profile/${id}`, {
        headers: headers,
        withCredentials: true,
      })
      .then((response) => {
        setcurrentUser(response.data);
      });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header-content")}>
          <Image width="50px" height="50px" src={message.avatar} />
          <h1 className={cx("header-title")}>{currentUser}</h1>
        </div>
        <div className={cx("header-notification")}>
          <NotificationIcon width="45px" height="45px" />
          <span>1</span>
        </div>
      </div>

      <div className={cx("status")}>
        <div className={cx("search")}>
          <FontAwesomeIcon className={cx("icon-search")} icon={faSearch} />
          <input type="text" placeholder="Search" />
          <FontAwesomeIcon className={cx("icon-delete")} icon={faDeleteLeft} />
        </div>
        <div className={cx("status-content")}>
          <span className={cx("status-title", "text-white")}>Favorites</span>
          <div className={cx("status-list")}>
            <AccountItem data={status} />
            <AccountItem data={status} />
            <AccountItem data={status} />
            <AccountItem data={status} />
          </div>
        </div>
      </div>
      <div className={cx("message-list")}>
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
      </div>
    </div>
  );
};

export default Sidebar;
