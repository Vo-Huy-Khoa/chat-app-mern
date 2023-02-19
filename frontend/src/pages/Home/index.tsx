import styles from "./home.module.scss";
import socket from "../../socket";
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
import { useContext, useEffect, useRef } from "react";
import { UserContext, MessageContext } from "../../providers";
import { createMessage } from "../../services";
import { IMessage } from "../../types";

const cx = classNames.bind(styles);

// useEffect(() => {
//   // Handle incoming messages
//   socket.on('message', (data) => {
//     setMessages((messages) => [...messages, data]);
//   });
// }, []);

const Home = () => {
  const currentUser = useContext(UserContext);
  const { selectMessage, getSelectMessage } = useContext(MessageContext);
  const countMessage = selectMessage.length > 0 ? selectMessage.length : null;
  const messageRef = useRef<HTMLInputElement>(null);
  const currentSenderID = currentUser?._id;
  const ReceiverUser = selectMessage.find((message) => {
    return message?.senderID?._id === currentSenderID;
  });
  const currentReceiverID = ReceiverUser?.receiverID?._id;
  const handleCreateMessage = (event: any) => {
    event.preventDefault();
    const message = messageRef.current?.value || "";
    // createMessage(currentSenderID, currentReceiverID, message).then(
    //   (response) => {
    //     const listMessage = response.data;
    //     listMessage.sort(
    //       (a: IMessage, b: IMessage) =>
    //         Date.parse(a.createdAt) - Date.parse(b.createdAt)
    //     );
    //     getSelectMessage(listMessage);
    //   }
    // );
    const data = {
      senderID: currentSenderID,
      receiverID: currentReceiverID,
      message: message,
      targetSocketId: currentReceiverID,
    };
    socket.emit("message", data);

    messageRef.current?.focus();
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    // Handle incoming messages
    socket.on("message", (data) => {
      console.log(data);
      const listMessage = data;
      listMessage.sort(
        (a: IMessage, b: IMessage) =>
          Date.parse(a.createdAt) - Date.parse(b.createdAt)
      );
      getSelectMessage(listMessage);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header", "fixed")}>
        {countMessage !== null && (
          <div className={cx("header__content")}>
            <Image
              src={ReceiverUser?.receiverID.avatar}
              width="60px"
              height="60px"
            />
            <div className={cx("header__content__text")}>
              <span>{ReceiverUser?.receiverID.username}</span>
              <p>{ReceiverUser?.receiverID.fullname}</p>
            </div>
          </div>
        )}
      </div>
      <div className={cx("content")}>
        <div className={cx("content__message")}>
          {selectMessage.map((message, index) => {
            if (message.senderID._id !== currentUser._id) {
              return (
                <div
                  key={index}
                  className={cx("content__message__item", "item-left")}
                >
                  <Image src={message.senderID.avatar} />
                  <div className={cx("your", "content__message__item__chat")}>
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={cx("content__message__item", "item-right")}
                >
                  <Image src={message.senderID.avatar} />
                  <div className={cx("me", "content__message__item__chat")}>
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      (
      {countMessage !== null && (
        <div className={cx("message", "fixed")}>
          <div className={cx("message__heading")}>
            <div className={cx("message__heading__content")}>
              <NavLink to="">reply</NavLink>
              <NavLink to="">note</NavLink>
            </div>
            <FontAwesomeIcon icon={faCircleQuestion} />
          </div>
          <input ref={messageRef} type="text" />
          <div className={cx("message__more")}>
            <div className={cx("message__more__file")}>
              <FontAwesomeIcon icon={faFileImage} />
              <FontAwesomeIcon icon={faBookmark} />
              <FontAwesomeIcon icon={faCopy} />
              <FontAwesomeIcon icon={faCircleInfo} />
              <FontAwesomeIcon icon={faItalic} />
              <FontAwesomeIcon icon={faLocation} />
              <FontAwesomeIcon icon={faStarHalfStroke} />
            </div>
            <div className={cx("message__more__action")}>
              <FontAwesomeIcon icon={faFileUpload} />
              <FontAwesomeIcon icon={faMicrophone} />
              <button onClick={handleCreateMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
      )
    </div>
  );
};

export default Home;
