import styles from "./notification.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faDeleteLeft,
  faSearch,
  faToggleOff,
  // faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../components/Image";
import { MoreIcon, PhoneIcon, UserAddIcon } from "../../components/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const profile = {
  avatar:
    "https://bedental.vn/wp-content/uploads/2022/11/nguoi-mau-Shin-Jae-Eun.jpg",
  name: "vo huy Khoa",
  username: "khoavh",
};
const cx = classNames.bind(styles);
interface User {
  fullname: string;
  username: string;
  email: string;
  avatar: "";
}
const Notification = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") || "";
  const user = sessionStorage.getItem("user") || "";
  let id: null = null;
  const [currentUser, setCurrentUser] = useState<User>({
    fullname: "",
    username: "",
    email: "",
    avatar: "",
  });
  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  }, [token]);
  if (user !== "") {
    id = JSON.parse(user).id;
  }


  console.log("re render Notification");

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Beaer ${token}`,
  };
  useEffect(() => {
    if (id === null) {
      return;
    }
    console.log("re render Notification Profile");

    axios
      .get(`api/user/profile/${id}`, {
        headers: headers,
        withCredentials: true,
      })
      .then((response) => {
        setCurrentUser(response.data);
      }).catch(()=>{
        sessionStorage.clear();
      })
      ;
  }, [id]);


  return (
    <div className={cx("wrapper")}>
      {/* <div className={cx("header")}>
        <div className={cx("search")}>
          <FontAwesomeIcon className={cx("icon-search")} icon={faSearch} />
          <input type="text" placeholder="Search" />
          <FontAwesomeIcon className={cx("icon-delete")} icon={faDeleteLeft} />
        </div>
      </div> */}
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
          <div className={cx("file-content")}>
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
