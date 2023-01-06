import styles from "./home.module.scss";
import classNames from "classnames/bind";
import Image from "../../components/Image";
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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

const profile = {
  avatar:
    "https://bedental.vn/wp-content/uploads/2022/11/nguoi-mau-Shin-Jae-Eun.jpg",
  name: "vo huy Khoa",
  username: "khoavh",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia fringilla quam, vel imperdiet felis faucibus in. Quisque commodo tortor non maximus vehicula. Sed imperdiet felis a velit convallis, a elementum quam cursus.",
};
const Home = () => {

  const token = sessionStorage.getItem("token") || "";
  const user = sessionStorage.getItem("user") || "";
  const id = JSON.parse(user).id;

  // const [currentUser, setcurrentUser] = useState();

  // const headers = {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   Authorization: `Beaer ${token}`,
  // };
  // useEffect(() => {
  //   axios
  //     .get(`api/user/profile/${id}`, {
  //       headers: headers,
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       setcurrentUser(response.data);
  //     });
  // }, []);

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

      <div className={cx("content")}>
        <div className={cx("message-list")}>
          <div className={cx("message-item", "item-right")}>
            <Image src={profile.avatar} />
            <div className={cx("me", "message-chat")}>
              <p>{profile.message}</p>
            </div>
          </div>
          <div className={cx("message-item", "item-left")}>
            <Image src={profile.avatar} />
            <div className={cx("your", "message-chat")}>
              <p>{profile.message}</p>
            </div>
          </div>
          <div className={cx("message-item", "item-right")}>
            <Image src={profile.avatar} />
            <div className={cx("me", "message-chat")}>
              <p>{profile.message}</p>
            </div>
          </div>
          <div className={cx("message-item", "item-left")}>
            <Image src={profile.avatar} />
            <div className={cx("your", "message-chat")}>
              <p>{profile.message}</p>
            </div>
          </div>
          <div className={cx("message-item", "item-right")}>
            <Image src={profile.avatar} />
            <div className={cx("me", "message-chat")}>
              <p>{profile.message}</p>
            </div>
          </div>
          <div className={cx("message-item", "item-left")}>
            <Image src={profile.avatar} />
            <div className={cx("your", "message-chat")}>
              <p>{profile.message}</p>
            </div>
          </div>
          <div className={cx("message-item", "item-right")}>
            <Image src={profile.avatar} />
            <div className={cx("me", "message-chat")}>
              <p>{profile.message}</p>
            </div>
          </div>
          <div className={cx("message-item", "item-left")}>
            <Image src={profile.avatar} />
            <div className={cx("your", "message-chat")}>
              <p>{profile.message}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("message", "fixed")}>
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
