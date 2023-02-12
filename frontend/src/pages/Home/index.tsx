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
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { UserContext, MessageContext } from "../../providers";
import { IMessage } from "../../types";

const cx = classNames.bind(styles);

const Home = () => {
  const currentUser = useContext(UserContext);
  const { selectMessage } = useContext(MessageContext);
  const messageRef = useRef<HTMLInputElement>(null);
  const currentMessage = messageRef.current?.value;
  const handleCreateMessage = () => {
    console.log(messageRef.current?.value);
  };
  useEffect(() => {
    return () => {};
  }, [currentMessage]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header", "fixed")}>
        <div className={cx("header__content")}>
          <Image src={currentUser.avatar} width="60px" height="60px" />
          <div className={cx("header__content__text")}>
            <span>{currentUser.username}</span>
            <p>{currentUser.fullname}</p>
          </div>
        </div>
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
      <Outlet />
    </div>
  );
};

export default Home;
