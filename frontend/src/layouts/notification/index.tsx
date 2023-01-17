import styles from "./notification.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faToggleOff,
  // faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../components/Image";
import { MoreIcon, PhoneIcon, UserAddIcon } from "../../components/Icon";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../providers";

const cx = classNames.bind(styles);

const Notification = () => {
  const currentUser = useContext(UserContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("profile")}>
        <Image src={currentUser.avatar} width="70px" height="70px" />
        <h1>{currentUser.username}</h1>
        <h2>{currentUser.fullname}</h2>
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
            <Image src={currentUser.avatar} />
            <Image src={currentUser.avatar} />
            <Image src={currentUser.avatar} />
          </div>
        </div>
        <div className={cx("file")}>
          <div className={cx("heading")}>
            <span>share files</span>
            <NavLink to="">View all</NavLink>
          </div>
          <div className={cx("file-content")}>
            <div className={cx("item")}>
              <img src={currentUser.avatar} alt="" />
              <div className={cx("text")}>
                <span>{currentUser.fullname}</span>
                <p>{currentUser.username}</p>
              </div>
            </div>
            <div className={cx("item")}>
              <img src={currentUser.avatar} alt="" />
              <div className={cx("text")}>
                <span>{currentUser.fullname}</span>
                <p>{currentUser.username}</p>
              </div>
            </div>
            <div className={cx("item")}>
              <img src={currentUser.avatar} alt="" />
              <div className={cx("text")}>
                <span>{currentUser.fullname}</span>
                <p>{currentUser.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
