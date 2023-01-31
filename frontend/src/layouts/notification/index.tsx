import styles from "./notification.module.scss";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faToggleOff,
  // faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../components/Image";
import { MoreIcon, PhoneIcon, UserAddIcon } from "../../components/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../providers";
import { Wrapper as PopperWrapper } from "../../components/Popper";
import { handleLogout } from "../../services/auth";
const cx = classNames.bind(styles);

const Notification = () => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("profile")}>
        <HeadlessTippy
          trigger="click"
          appendTo={document.body}
          interactive
          placement="bottom"
          render={(attrs) => (
            <div className={cx("popper")} tabIndex={1} {...attrs}>
              <PopperWrapper className={cx("popper--wrapper")}>
                <ul>
                  <li>Profile</li>
                  <li>Settings</li>
                  <li>Report</li>
                  <li
                    onClick={() => {
                      try {
                        handleLogout().then(() => {
                          sessionStorage.clear();
                          navigate("/login");
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </PopperWrapper>
            </div>
          )}
        >
          <div>
            <Image
              className={cx("profile--avatar")}
              src={currentUser.avatar}
              width="70px"
              height="70px"
            />
          </div>
        </HeadlessTippy>
        <h1>{currentUser.username}</h1>
        <h2>{currentUser.fullname}</h2>
        <div className={cx("profile__more")}>
          <PhoneIcon />
          <UserAddIcon />
          <MoreIcon />
        </div>
      </div>

      <div className={cx("notification")}>
        <div className={cx("notification__item")}>
          <FontAwesomeIcon icon={faBell} />
          <h2>Notifications</h2>
          <FontAwesomeIcon icon={faToggleOff} />
          {/* <FontAwesomeIcon icon={faToggleOn} /> */}
        </div>
        <div className={cx("notification__item")}>
          <FontAwesomeIcon icon={faBell} />
          <h2>Bookmarks</h2>
          <button>16</button>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("content__media")}>
          <div className={cx("content__heading")}>
            <span>share medias</span>
            <NavLink to="">View all</NavLink>
          </div>
          <div className={cx("content__media__item")}>
            <Image src={currentUser.avatar} />
            <Image src={currentUser.avatar} />
            <Image src={currentUser.avatar} />
          </div>
        </div>
        <div className={cx("content__file")}>
          <div className={cx("content__heading")}>
            <span>share files</span>
            <NavLink to="">View all</NavLink>
          </div>
          <div className={cx("content__file__content")}>
            <div className={cx("content__file__content__item")}>
              <img src={currentUser.avatar} alt="" />
              <div className={cx("content__file__content__item__text")}>
                <span>{currentUser.fullname}</span>
                <p>{currentUser.username}</p>
              </div>
            </div>
            <div className={cx("content__file__content__item")}>
              <img src={currentUser.avatar} alt="" />
              <div className={cx("content__file__content__item__text")}>
                <span>{currentUser.fullname}</span>
                <p>{currentUser.username}</p>
              </div>
            </div>
            <div className={cx("content__file__content__item")}>
              <img src={currentUser.avatar} alt="" />
              <div className={cx("content__file__content__item__text")}>
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
