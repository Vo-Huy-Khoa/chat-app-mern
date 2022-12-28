import styles from "./home.module.scss";
import classNames from "classnames/bind";
import Image from "../../components/ui/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCircleInfo,
  faCircleQuestion,
  faCopy,
  faFileImage,
  faFileUpload,
  faItalic,
  faLocation,
  faMicrophone,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const profile = {
  avatar:
    "https://bedental.vn/wp-content/uploads/2022/11/nguoi-mau-Shin-Jae-Eun.jpg",
  name: "vo huy Khoa",
  username: "khoavh",
};
const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header", "fixed")}>
        <div className={cx("content")}>
          <Image src={profile.avatar} width="60px" height="60px" />
          <div className={cx("text")}>
            <span>{profile.name}</span>
            <p>{profile.username}</p>
          </div>
        </div>
      </div>

      <div className={cx("content")}></div>

      <div className={cx("message")}>
        <div className={cx("heading")}>
          <div className={cx("heading-content")}>
            <NavLink to="">reply</NavLink>
            <NavLink to="">note</NavLink>
          </div>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </div>
        <input type="text" />
        <div className={cx("more")}>
          <div className={cx("file")}>
            <FontAwesomeIcon icon={faFileImage} />
            <FontAwesomeIcon icon={faBookmark} />
            <FontAwesomeIcon icon={faCopy} />
            <FontAwesomeIcon icon={faCircleInfo} />
            <FontAwesomeIcon icon={faItalic} />
            <FontAwesomeIcon icon={faLocation} />
            <FontAwesomeIcon icon={faStarHalfStroke} />
          </div>
          <div className={cx("action")}>
            <FontAwesomeIcon icon={faFileUpload} />
            <FontAwesomeIcon icon={faMicrophone} />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
