import moment from "moment";
import styles from "./account.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import { useContext } from "react";
import {
  MessageContext,
  ReceiverContext,
  UserContext,
  VisibilityContext,
} from "../../providers";
import { IMessage } from "../../types";
import socket from "../../socket";

const cx = classNames.bind(styles);

const AccountItem = ({ ...rest }) => {
  const { listMessage, searchUser } = rest;
  const { getSelectMessage } = useContext(MessageContext);
  const { setCurrentReceiver } = useContext(ReceiverContext);
  const { toggleVisibility } = useContext(VisibilityContext);
  const currentUser = useContext(UserContext);

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
    toggleVisibility("home");
    if (currentMessage === null || currentMessage.length === 0) {
      const data = {
        senderID: senderID,
        receiverID: receiverID,
        message: "",
      };
      socket.emit("message", data);

      socket.on("message", (data) => {
        const listMessage = data;
        listMessage.sort(
          (a: IMessage, b: IMessage) =>
            Date.parse(a.createdAt) - Date.parse(b.createdAt)
        );
        console.log(listMessage);

        getSelectMessage(listMessage);
      });
    }
    setCurrentReceiver(searchUser);
    getSelectMessage(currentMessage);
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
  const { setCurrentReceiver } = useContext(ReceiverContext);
  const { toggleVisibility } = useContext(VisibilityContext);
  const { getSelectMessage } = useContext(MessageContext);
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
    setCurrentReceiver(searchUser);
    getSelectMessage(currentMessage);
    toggleVisibility("home");
  };

  return (
    <div className={cx("account-message")} onClick={handleSubmit}>
      <Image width="60px" height="60px" src={message?.receiverID?.avatar} />
      <div className={cx("content")}>
        <h2 className={cx("name", "text-white")}>
          {message?.receiverID?.username}
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

export { AccountItem, AccountMessage };
