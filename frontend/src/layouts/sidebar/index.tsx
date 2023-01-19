import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import Image from "../../components/Image";
import HeadlessTippy from "@tippyjs/react/headless";
import { NotificationIcon } from "../../components/Icon";
import { AccountItem, AccountMessage } from "../../components/AccountItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks";
import { Wrapper as PopperWrapper } from "../../components/Popper";
import { useContext } from "react";
import { UserContext } from "../../providers";
import { handleSearch } from "../../services";

const cx = classNames.bind(styles);

const message = {
  avatar:
    "https://cdn.24h.com.vn/upload/3-2021/images/2021-09-21/anh-2-1632216610-256-width650height867.jpg",
  name: "Anh Thy",
  react: "haha",
  message: "chat bot",
  time: "9:50",
};

const Sidebar = () => {
  const currentUser = useContext(UserContext);

  const [valueSearch, setValueSearch] = useState("");
  const debounceValue = useDebounce(valueSearch, 500);
  const [listUserSearch, setListSearch] = useState([]);

  useEffect(() => {
    if (!debounceValue.trim()) {
      return;
    }
    handleSearch(debounceValue)
      .then((response) => {
        setListSearch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <HeadlessTippy
        trigger="click"
        appendTo={document.body}
        interactive
        placement="bottom"
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex={1} {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>accounts</h4>
              {listUserSearch.map((item, index) => {
                return <AccountItem key={index} data={item} />;
              })}
            </PopperWrapper>
          </div>
        )}
      >
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
            <FontAwesomeIcon
              className={cx("icon-delete")}
              icon={faDeleteLeft}
            />
          </div>
          {/* <div className={cx("status-content")}>
            <span className={cx("status-title", "text-white")}>Favorites</span>
            <div className={cx("status-list")}>
              {listUserSearch.map((user, key) => {
                return <AccountItem key={key} data={user} />;
              })}
            </div>
          </div> */}
        </div>
      </HeadlessTippy>
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
