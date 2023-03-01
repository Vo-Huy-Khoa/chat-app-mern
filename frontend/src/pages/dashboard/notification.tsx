import styles from "../../assets/scss/notification.module.scss";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faBell,
  faToggleOff,
  // faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "../../components/Image";
import { MoreIcon, PhoneIcon, UserAddIcon } from "../../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { VisibilityContext } from "../../providers";
import { Wrapper as PopperWrapper } from "../../components";
import { handleLogout } from "../../services/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
const cx = classNames.bind(styles);
const Notification = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const { isVisible } = useContext(VisibilityContext);
  const { toggleVisibility } = useContext(VisibilityContext);
  const handleHome = () => {
    toggleVisibility("home");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("settings")}>
        {isVisible === "notification" && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handleHome}
            className={cx("icon-back")}
          />
        )}
        {isVisible === "notification" && (
          <FontAwesomeIcon icon={faBars} className={cx("icon-back")} />
        )}
      </div>
      <div className={cx("profile")}>
        <HeadlessTippy
          trigger="click"
          appendTo={document.body}
          placement="bottom"
          interactive
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
                          navigate("/auth/sign-in");
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
              className={cx("profile__avatar")}
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

export { Notification };
