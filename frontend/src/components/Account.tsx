import moment from "moment";
import styles from "../assets/scss/account.module.scss";
import classNames from "classnames/bind";
import { Image } from "./Image";
import { IMessage } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import {
  setCurrentReceiver,
  setSelectMessage,
  setVisibility,
} from "../redux/actions";

const cx = classNames.bind(styles);

const AccountItem = ({ ...rest }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const { listMessage, searchUser } = rest;
  const receiverID = searchUser?._id;
  const senderID = currentUser?._id;

  const listSenderID = listMessage.filter((message: IMessage) => {
    return (
      message?.senderID?._id === senderID &&
      message?.receiverID?._id === receiverID
    );
  });

  const listReceiverID = listMessage.filter((message: IMessage) => {
    return (
      message?.senderID?._id === receiverID &&
      message?.receiverID?._id === senderID
    );
  });

  const currentMessage = [...listSenderID, ...listReceiverID];

  currentMessage.sort(
    (a: IMessage, b: IMessage) =>
      Date.parse(a.createdAt) - Date.parse(b.createdAt)
  );

  const handleSubmit = () => {
    dispatch(setVisibility("home"));
    dispatch(setCurrentReceiver(searchUser));
    dispatch(setSelectMessage(currentMessage));
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
  const { listMessage, message, searchUser } = rest;

  const receiverID = message?.receiverID?._id;
  const senderID = message?.senderID?._id;

  const listSenderID = listMessage.filter((message: IMessage) => {
    return (
      message?.senderID?._id === senderID &&
      message?.receiverID?._id === receiverID
    );
  });

  const listReceiverID = listMessage.filter((message: IMessage) => {
    return (
      message?.senderID?._id === receiverID &&
      message?.receiverID?._id === senderID
    );
  });

  const currentMessage = [...listSenderID, ...listReceiverID];

  currentMessage.sort(
    (a: IMessage, b: IMessage) =>
      Date.parse(a.createdAt) - Date.parse(b.createdAt)
  );

  const handleSubmit = () => {
    dispatch(setCurrentReceiver(searchUser));
    dispatch(setVisibility("home"));
    dispatch(setSelectMessage(currentMessage));
  };

  return (
    <div className={cx("account-message")} onClick={handleSubmit}>
      <Image
        width="60px"
        height="60px"
        src={
          message.receiverID === searchUser
            ? message?.receiverID?.avatar
            : message?.senderID?.avatar
        }
      />
      <div className={cx("content")}>
        <h2 className={cx("name", "text-white")}>
          {message.receiverID === searchUser
            ? message?.receiverID?.username
            : message?.senderID?.username}
        </h2>
        <span className={cx("react", "text-white")}>{message?.react}</span>
        <p className={cx("message", "text-gray")}>{message?.message}</p>
      </div>
      <div className={cx("more")}>
        <span className={cx("text-gray")}>
          {/* {moment(data?.updateAt).format("YYYY-MM-DD HH:mm:ss")} */}
          {moment(message?.updateAt).format("HH:mm")}
        </span>
      </div>
    </div>
  );
};

const AccountStatus = ({ ...rest }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const { listMessage, searchUser } = rest;
  const receiverID = searchUser?._id;
  const senderID = currentUser?._id;

  const listSenderID = listMessage.filter((message: IMessage) => {
    return (
      message?.senderID?._id === senderID &&
      message?.receiverID?._id === receiverID
    );
  });

  const listReceiverID = listMessage.filter((message: IMessage) => {
    return (
      message?.senderID?._id === receiverID &&
      message?.receiverID?._id === senderID
    );
  });

  const currentMessage = [...listSenderID, ...listReceiverID];

  currentMessage.sort(
    (a: IMessage, b: IMessage) =>
      Date.parse(a.createdAt) - Date.parse(b.createdAt)
  );

  const handleSubmit = () => {
    dispatch(setVisibility("home"));
    dispatch(setCurrentReceiver(searchUser));
    dispatch(setSelectMessage(currentMessage));
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
