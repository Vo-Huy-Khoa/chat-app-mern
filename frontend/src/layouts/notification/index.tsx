import styles from "./notification.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faDeleteLeft,
  faSearch,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../components/Image";
import {
  MoreIcon,
  PhoneIcon,
  UserAddIcon,
} from "../../components/Icon";
import { NavLink } from "react-router-dom";
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
      <div className={cx("notification-list")}>
        <div className={cx("notification-item")}>
          <FontAwesomeIcon icon={faBell} />
          <h2>Notifications</h2>
          <FontAwesomeIcon icon={faToggleOff} />
          {/* <FontAwesomeIcon icon={faToggleOn} /> */}
        </div>
        <div className={cx("notification-item")}>
          <FontAwesomeIcon icon={faBell} />
          <h2>Bookmarks</h2>
          <button>16</button>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("media")}>
          <div className={cx("heading")}>
            <span>share medias</span>
            <NavLink to="">View all</NavLink>
          </div>
          <div className={cx("item")}>
            <Image src={profile.avatar} />
            <Image src={profile.avatar} />
            <Image src={profile.avatar} />
          </div>
        </div>
        <div className={cx("file")}>
          <div className={cx("heading")}>
            <span>share files</span>
            <NavLink to="">View all</NavLink>
          </div>
          <div className={cx("content")}>
            <div className={cx("item")}>
              <img src={profile.avatar} alt="" />
              <div className={cx("text")}>
                <span>{profile.name}</span>
                <p>{profile.username}</p>
              </div>
            </div>
            <div className={cx("item")}>
              <img src={profile.avatar} alt="" />
              <div className={cx("text")}>
                <span>{profile.name}</span>
                <p>{profile.username}</p>
              </div>
            </div>
            <div className={cx("item")}>
              <img src={profile.avatar} alt="" />
              <div className={cx("text")}>
                <span>{profile.name}</span>
                <p>{profile.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
