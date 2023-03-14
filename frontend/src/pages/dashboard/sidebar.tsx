import styles from "../../assets/scss/sidebar.module.scss";
import classNames from "classnames/bind";
import { Image } from "../../components/Image";
import HeadlessTippy from "@tippyjs/react/headless";
import { NotificationIcon } from "../../assets/icons";
import {
  AccountItem,
  AccountMessage,
  AccountStatus,
} from "../../components/Account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faChevronDown,
  faDeleteLeft,
  faGear,
  faRightFromBracket,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../hooks";
import { Wrapper as PopperWrapper } from "../../components";
import {
  handleSearch,
  getListMessage,
  getListUser,
} from "../../services/dashboard";
import { IMessage, IUser, selectMessageType } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const Sidebar = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [valueSearch, setValueSearch] = useState("");
  const debounceValue = useDebounce(valueSearch, 500);
  const [listUserSearch, setListSearch] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listMessage, setListMessage] = useState<selectMessageType>([]);

  const handleFilterMessage = useCallback(
    (listMessage: selectMessageType) => {
      const uniqueMessage = Array.from(
        new Map(
          listMessage.map((message: IMessage) => [
            message?.senderID?._id,
            message,
          ]) &&
            listMessage.map((message: IMessage) => [
              message?.receiverID?._id,
              message,
            ])
        ).values()
      );

      const filterArray = uniqueMessage.filter((message) => {
        return message.receiverID._id !== currentUser._id;
      });

      return filterArray;
    },
    [currentUser._id]
  );

  const handleLogout = async () => {
    try {
      await handleLogout();
      sessionStorage.clear();
      navigate("/auth/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!debounceValue.trim()) {
      return;
    }
    handleSearch(debounceValue).then((response) => {
      setListSearch(response.data);
    });
  }, [debounceValue]);

  useEffect(() => {
    async function fetchMessagesAndUsers() {
      try {
        const messageResponse = await getListMessage();
        const listMessage = handleFilterMessage(messageResponse.data);
        setListMessage(listMessage);

        const userResponse = await getListUser();
        setListUser(userResponse.data);
      } catch (error) {
        // Handle errors
      }
    }

    fetchMessagesAndUsers();
  }, [handleFilterMessage]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header__content")}>
          <HeadlessTippy
            trigger="click"
            appendTo={document.body}
            placement="bottom"
            interactive
            render={(attrs) => (
              <div className={cx("popper")} tabIndex={1} {...attrs}>
                <PopperWrapper className="search">
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faUser}
                        className={cx("header--icon")}
                      />
                      Profile
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faGear}
                        className={cx("header--icon")}
                      />
                      Settings
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faBug}
                        className={cx("header--icon")}
                      />
                      Report
                    </li>
                    <li onClick={handleLogout}>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className={cx("header--icon")}
                      />
                      Logout
                    </li>
                  </ul>
                </PopperWrapper>
              </div>
            )}
          >
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={cx("header--icon")}
              />
              <Image width="50px" height="50px" src={currentUser.avatar} />
            </div>
          </HeadlessTippy>
          <h1 className={cx("header__content--title")}>
            {currentUser.username}
          </h1>
        </div>
        <div className={cx("header__notification")}>
          <NotificationIcon width="45px" height="45px" />
          <span>1</span>
        </div>
      </div>
      <div className={cx("status")}>
        <HeadlessTippy
          trigger="click"
          appendTo={document.body}
          placement="bottom"
          interactive
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex={1} {...attrs}>
              <PopperWrapper>
                {listUserSearch.map((user, index) => {
                  return (
                    <AccountItem
                      key={index}
                      listMessage={listMessage}
                      searchUser={user}
                    />
                  );
                })}
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx("status__search")}>
            <FontAwesomeIcon
              className={cx("status__search--icon-search")}
              icon={faSearch}
            />
            <input
              onChange={(e) => {
                setValueSearch(e.currentTarget.value);
              }}
              value={valueSearch}
              type="text"
              placeholder="Search"
            />
            <FontAwesomeIcon
              className={cx("status__search--icon-delete")}
              icon={faDeleteLeft}
              onClick={() => {
                setValueSearch("");
              }}
            />
          </div>
        </HeadlessTippy>
        <div className={cx("status__content")}>
          <span className={cx("status__content--title", "text-white")}>
            All User
          </span>
          <div className={cx("status__list")}>
            {listUser.map((user: IUser, index) => {
              return (
                <AccountStatus
                  key={index}
                  listMessage={listMessage}
                  searchUser={user}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={cx("message__list")}>
        {listMessage.map((message: IMessage, index) => {
          return (
            <AccountMessage
              className={cx("message-item")}
              key={index}
              currentMessage={message}
              searchUser={
                message.senderID === currentUser
                  ? message.senderID
                  : message.receiverID
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export { Sidebar };
