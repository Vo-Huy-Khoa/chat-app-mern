import styles from "./notification.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faMarsAndVenus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../../ui/Image";
import { MoreIcon, PhoneIcon, UserAddIcon } from "../../../ui/Icon";
const profile = {
  avatar:
    "https://bedental.vn/wp-content/uploads/2022/11/nguoi-mau-Shin-Jae-Eun.jpg",
  name: "vo huy Khoa",
  username: "khoavh",
};
const cx = classNames.bind(styles);

const Notification = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("search")}>
          <FontAwesomeIcon className={cx("icon-search")} icon={faSearch} />
          <input type="text" placeholder="Search" />
          <FontAwesomeIcon className={cx("icon-delete")} icon={faDeleteLeft} />
        </div>
      </div>
      <div className={cx("profile")}>
        <Image src={profile.avatar} width="70px" height="70px" />
        <h1>{profile.name}</h1>
        <h2>{profile.username}</h2>

        <div className={cx("more")}>
          <PhoneIcon />
          <UserAddIcon />
          <MoreIcon />
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("media")}>
          <div className={cx("notification")}>
            <Notification />
            <h2>Notification</h2>
            <Notification />
          </div>
        </div>
        <div className={cx("file")}></div>
      </div>
    </div>
  );
};

export default Notification;
