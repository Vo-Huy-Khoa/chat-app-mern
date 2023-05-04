import { Image } from "../../components/Image";
import HeadlessTippy from "@tippyjs/react/headless";
import {
  AccountItem,
  AccountMessage,
  AccountStatus,
} from "../../components/Account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBug,
  faChevronDown,
  faDeleteLeft,
  faGear,
  faRightFromBracket,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks";
import { Wrapper as PopperWrapper } from "../../components";
import {
  handleSearch,
  getListMessage,
  getListUser,
  handleFilterMessage,
} from "../../services/dashboard";
import { IMessage, IUser, selectMessageType } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { handleLogout } from "../../services";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [valueSearch, setValueSearch] = useState("");
  const debounceValue = useDebounce(valueSearch, 500);
  const [listUserSearch, setListSearch] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listMessage, setListMessage] = useState<selectMessageType>([]);

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
        const listMessage = handleFilterMessage(
          messageResponse.data,
          currentUser
        );
        setListMessage(listMessage);

        const userResponse = await getListUser();
        setListUser(userResponse.data);
      } catch (error) {
        // Handle errors
      }
    }

    fetchMessagesAndUsers();
  }, [currentUser]);

  return (
    <div className="flex flex-col gap-12 p-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4  items-center relative">
          <HeadlessTippy
            trigger="click"
            appendTo={document.body}
            placement="bottom"
            interactive
            render={(attrs) => (
              <div tabIndex={1} {...attrs}>
                <PopperWrapper>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faUser} />
                      Profile
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faGear} />
                      Settings
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faBug} />
                      Report
                    </li>
                    <li onClick={handleLogout}>
                      <NavLink
                        to="/auth/sign-in"
                        className="text-white flex flex-row gap-2 w-full"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </PopperWrapper>
              </div>
            )}
          >
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-white bg-gray w-4 h-4 p-3 rounded-full absolute bottom-0 left-14 cursor-pointer"
              />
              <Image src={currentUser.avatar} />
            </div>
          </HeadlessTippy>
          <h1 className="text-white text-4xl ">{currentUser.username}</h1>
        </div>
        <div className="relative text-white cursor-pointer">
          <FontAwesomeIcon
            icon={faBell}
            className="w-10 h-10 p-4 text-white bg-gray rounded-full"
          />
          <span className="text-white text-2xl item-center bg-blue w-10 h-10 rounded-full absolute top-0 right-0 text-center ">
            1
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <HeadlessTippy
          trigger="click"
          appendTo={document.body}
          placement="bottom"
          interactive
          render={(attrs) => (
            <div tabIndex={1} {...attrs}>
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
          <div className="relative">
            <FontAwesomeIcon
              className="absolute top-0 bottom-0 left-5 transform translate-y-1/2 text-white text-3xl cursor-pointer"
              icon={faSearch}
            />
            <input
              onChange={(e) => {
                setValueSearch(e.currentTarget.value);
              }}
              value={valueSearch}
              type="text"
              placeholder="Search"
              className="w-full h-14 bg-black rounded-3xl text-white p-8 pl-14 text-2xl"
            />
            <FontAwesomeIcon
              className="absolute top-0 bottom-0 right-5 transform translate-y-1/2 text-white text-3xl cursor-pointer"
              icon={faDeleteLeft}
              onClick={() => {
                setValueSearch("");
              }}
            />
          </div>
        </HeadlessTippy>
        <div className="flex flex-col gap-8">
          <h3 className="text-white text-3xl">All User</h3>
          <div className="flex row gap-4 overflow-x-auto">
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
      <div className="flex flex-col gap-4">
        {listMessage.map((message: IMessage, index) => {
          return (
            <AccountMessage
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
