import styles from "./notification.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faInfoCircle,
  faMessage,
  faSignOut,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../../ui/Image";

const cx = classNames.bind(styles);

const Notification = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}></div>
      <div className={cx("profile")}></div>
      <div className={cx("content")}>
        <div className={cx("media")}></div>
        <div className={cx("file")}></div>
      </div>
    </div>
  );
};

export default Notification;
