import styles from "../../assets/scss/notification.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faBell,
  faToggleOff,
  // faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "../../components/Image";
import { MoreIcon, PhoneIcon, UserAddIcon } from "../../assets/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { setVisibility } from "../../redux/actions";
const cx = classNames.bind(styles);
const Notification = () => {
  const dispatch = useDispatch();
  const currentReceiver = useSelector(
    (state: RootState) => state.currentReceiver
  );
  const isVisible = useSelector((state: RootState) => state.currentVisibility);

  const handleHome = () => {
    dispatch(setVisibility("home"));
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
        <div>
          <Image
            className={cx("profile__avatar")}
            src={currentReceiver.avatar}
            width="70px"
            height="70px"
          />
        </div>
        <h1>{currentReceiver.username}</h1>
        <h2>{currentReceiver.fullname}</h2>
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
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU" />
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU" />
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU" />
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU" />
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU" />
          </div>
        </div>
        <div className={cx("content__file")}>
          <div className={cx("content__heading")}>
            <span>share files</span>
            <NavLink to="">View all</NavLink>
          </div>
          <div className={cx("content__file__content")}>
            <div className={cx("content__file__content__item")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-k-5EjtwnDbrOsipvcwsU37OIJO38Etp7v5enr9dEw9RJkT7BismQoYmsWXHgqw47a14&usqp=CAU"
                alt=""
              />
              <div className={cx("content__file__content__item__text")}>
                <span>File Name</span>
                <p>File Description</p>
              </div>
            </div>
            <div className={cx("content__file__content__item")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-k-5EjtwnDbrOsipvcwsU37OIJO38Etp7v5enr9dEw9RJkT7BismQoYmsWXHgqw47a14&usqp=CAU"
                alt=""
              />
              <div className={cx("content__file__content__item__text")}>
                <span>File Name</span>
                <p>File Description</p>
              </div>
            </div>{" "}
            <div className={cx("content__file__content__item")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-k-5EjtwnDbrOsipvcwsU37OIJO38Etp7v5enr9dEw9RJkT7BismQoYmsWXHgqw47a14&usqp=CAU"
                alt=""
              />
              <div className={cx("content__file__content__item__text")}>
                <span>File Name</span>
                <p>File Description</p>
              </div>
            </div>{" "}
            <div className={cx("content__file__content__item")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-k-5EjtwnDbrOsipvcwsU37OIJO38Etp7v5enr9dEw9RJkT7BismQoYmsWXHgqw47a14&usqp=CAU"
                alt=""
              />
              <div className={cx("content__file__content__item__text")}>
                <span>File Name</span>
                <p>File Description</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Notification };
