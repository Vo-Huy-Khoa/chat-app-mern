import styles from "../../assets/scss/home.module.scss";
import socket from "../../socket";
import classNames from "classnames/bind";
import { Image } from "../../components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleInfo,
  faCopy,
  faFileImage,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { IMessage } from "../../types";
import { getProfile } from "../../services";
import {
  setCurrentUser,
  setSelectMessage,
  setVisibility,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";

const cx = classNames.bind(styles);
const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const currentReceiver = useSelector(
    (state: RootState) => state.currentReceiver
  );
  const selectMessage = useSelector((state: RootState) => state.currentMessage);
  const isVisible = useSelector((state: RootState) => state.currentVisibility);

  const countMessage = currentReceiver._id.length ? 1 : null;
  const messageRef = useRef<HTMLInputElement>(null);
  const currentSenderID = currentUser?._id;
  const currentReceiverID = currentReceiver?._id;

  const handleCreateMessage = (event: any) => {
    event.preventDefault();
    const message = messageRef.current?.value || "";
    const data = {
      senderID: currentSenderID,
      receiverID: currentReceiverID,
      message: message,
    };
    socket.emit("message", data);
    messageRef.current?.focus();
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };

  const handleBackSidebar = () => {
    dispatch(setVisibility("sidebar"));
  };

  const handleNotification = () => {
    dispatch(setVisibility("notification"));
  };

  useEffect(() => {
    function handleNewMessage(data: any) {
      const sortedMessages = data.sort(
        (a: IMessage, b: IMessage) =>
          Date.parse(a.createdAt) - Date.parse(b.createdAt)
      );
      dispatch(setSelectMessage(sortedMessages));
    }

    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    getProfile().then((res) => {
      dispatch(setCurrentUser(res.data));
    });
  }, [dispatch]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header", "fixed")}>
        {isVisible === "home" && (
          <FontAwesomeIcon
            onClick={handleBackSidebar}
            icon={faArrowLeft}
            className={cx("icon-back")}
          />
        )}
        {countMessage !== null && (
          <div className={cx("header__content")}>
            <Image src={currentReceiver?.avatar} width="60px" height="60px" />
            <div className={cx("header__content__text")}>
              <span>{currentReceiver?.username}</span>
              <p>{currentReceiver?.fullname}</p>
            </div>
          </div>
        )}

        {isVisible === "home" && (
          <FontAwesomeIcon
            onClick={handleNotification}
            icon={faCircleInfo}
            className={cx("icon-back")}
          />
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
          <div className={cx("message__more")}>
            <div className={cx("message__more__file")}>
              <FontAwesomeIcon icon={faFileImage} />
              <FontAwesomeIcon icon={faCopy} />
              <FontAwesomeIcon icon={faMicrophone} />
            </div>
            <input ref={messageRef} type="text" />
            <div className={cx("message__more__action")}>
              <button onClick={handleCreateMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
      )
    </div>
  );
};

export { Home };
