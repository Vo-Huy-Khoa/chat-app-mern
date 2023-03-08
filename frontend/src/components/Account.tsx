import moment from "moment";
import styles from "../assets/scss/account.module.scss";
import classNames from "classnames/bind";
import { Image } from "./Image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import { setCurrentReceiver, setVisibility } from "../redux/actions";
import { useEffect, useRef, useState } from "react";
import socket from "../socket";

const cx = classNames.bind(styles);

const AccountItem = ({ ...rest }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const { searchUser } = rest;
  const senderID = currentUser?._id;
  const receiverID = searchUser?._id;

  const handleSubmit = () => {
    dispatch(setVisibility("home"));
    dispatch(setCurrentReceiver(searchUser));
    const data = {
      senderID: receiverID,
      receiverID: senderID,
    };
    socket.emit("get-message", data);
  };

  return (
    <div className={cx("account-item")} onClick={() => handleSubmit()}>
      <Image src={searchUser?.avatar} />
      <div className={cx("content")}>
        <span className={cx("username")}>{searchUser?.username}</span>
        <span className={cx("fullname")}>{searchUser?.fullname}</span>
      </div>
    </div>
  );
};

const AccountMessage = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { currentMessage, searchUser } = rest;
  const divRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const currentReceiver = useSelector(
    (state: RootState) => state.currentReceiver
  );
  const senderID = currentUser?._id;
  const receiverID = searchUser?._id;
  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 425);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      divRef.current &&
      divRef.current.parentElement?.children[0] === divRef.current &&
      isLargeScreen
    ) {
      divRef.current.click();
    }
  }, [isLargeScreen]);

  const handleSubmit = () => {
    dispatch(setCurrentReceiver(searchUser));
    dispatch(setVisibility("home"));
    const data = {
      senderID: senderID,
      receiverID: receiverID,
    };
    socket.emit("get-message", data);
  };

  return (
    <div
      className={cx(
        "account-message",
        isLargeScreen &&
          currentReceiver._id === searchUser?._id &&
          "account-current"
      )}
      onClick={handleSubmit}
      ref={divRef}
    >
      <Image
        width="60px"
        height="60px"
        src={
          currentMessage.senderID === currentUser
            ? currentMessage?.senderID?.avatar
            : currentMessage?.receiverID?.avatar
        }
      />
      <div className={cx("content")}>
        <h2 className={cx("name", "text-white")}>
          {currentMessage.senderID === currentUser
            ? currentMessage?.senderID?.username
            : currentMessage?.receiverID?.username}
        </h2>
        <span className={cx("react", "text-white")}>
          {currentMessage?.react}
        </span>
        <p className={cx("message", "text-gray")}>{currentMessage?.message}</p>
      </div>
      <div className={cx("more")}>
        <span className={cx("text-gray")}>
          {/* {moment(data?.updateAt).format("YYYY-MM-DD HH:mm:ss")} */}
          {moment(currentMessage?.createdAt).format("HH:mm")}
        </span>
      </div>
    </div>
  );
};

const AccountStatus = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { searchUser } = rest;
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const receiverID = searchUser?._id;
  const senderID = currentUser?._id;
  const handleSubmit = () => {
    dispatch(setVisibility("home"));
    dispatch(setCurrentReceiver(searchUser));
    const data = {
      senderID: receiverID,
      receiverID: senderID,
    };
    socket.emit("get-message", data);
  };

  return (
    <div
      className={cx("status__content_account")}
      onClick={() => handleSubmit()}
    >
      <img
        className={cx("status__content--avatar")}
        src={searchUser?.avatar}
        alt={searchUser?.fullname}
      />
      <h1 className={cx("status__content--username")}>
        {searchUser?.username}
      </h1>
    </div>
  );
};

export { AccountItem, AccountMessage, AccountStatus };
