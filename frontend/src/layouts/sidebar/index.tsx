import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import Image from "../../components/Image";
import { NotificationIcon } from "../../components/Icon";
import { AccountItem, AccountMessage } from "../../components/AccountItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks";
import axios from "axios";
const cx = classNames.bind(styles);

const message = {
  avatar:
    "https://cdn.24h.com.vn/upload/3-2021/images/2021-09-21/anh-2-1632216610-256-width650height867.jpg",
  name: "Anh Thy",
  react: "haha",
  message: "chat bot",
  time: "9:50",
};
interface User {
  fullname: string;
  username: string;
  email: string;
  avatar: "";
}

const Sidebar = () => {
  const [currentUser, setcurrentUser] = useState<User>({
    fullname: "",
    username: "",
    email: "",
    avatar: "",
  });
  // console.log(currentUser);

  const [valueSearch, setValueSearch] = useState("");
  const debounceValue = useDebounce(valueSearch, 500);
  const [listUserSearch, setListSearch] = useState([]);
  const token = sessionStorage.getItem("token") || "";
  const user = sessionStorage.getItem("user") || "";
  let id: null = null;
  if (user !== "") {
    id = JSON.parse(user).id;
  }

  console.log('re render component');

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Beaer ${token}`,
  };
  useEffect(() => {
    
    if (id === null) {
      return;
    }
    console.log('re render profile');
    
    axios
      .get(`api/user/profile/${id}`, {
        headers: headers,
        withCredentials: true,
      })
      .then((response) => {
        setcurrentUser(response.data);
      });
  }, [id]);

  useEffect(() => {
    if (!debounceValue.trim()) {
      return;
    }
    axios
      .post(`api/user/search`, JSON.stringify({ username: debounceValue }), {
        headers: headers,
        withCredentials: true,
      })
      .then((response) => {
        setListSearch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log('re render list');
  }, [debounceValue]);


  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header-content")}>
          <Image width="50px" height="50px" src={currentUser.avatar} />
          <h1 className={cx("header-title")}>{currentUser.username}</h1>
        </div>
        <div className={cx("header-notification")}>
          <NotificationIcon width="45px" height="45px" />
          <span>1</span>
        </div>
      </div>

      <div className={cx("status")}>
        <div className={cx("search")}>
          <FontAwesomeIcon className={cx("icon-search")} icon={faSearch} />
          <input
            onChange={(e) => {
              setValueSearch(e.currentTarget.value);
            }}
            type="text"
            placeholder="Search"
          />
          <FontAwesomeIcon className={cx("icon-delete")} icon={faDeleteLeft} />
        </div>
        <div className={cx("status-content")}>
          <span className={cx("status-title", "text-white")}>Favorites</span>
          <div className={cx("status-list")}>
            {listUserSearch.map((user, key) => {
              return <AccountItem key={key} data={user} />;
            })}
          </div>
        </div>
      </div>
      <div className={cx("message-list")}>
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
        <AccountMessage data={message} />
      </div>
    </div>
  );
};

export default Sidebar;
