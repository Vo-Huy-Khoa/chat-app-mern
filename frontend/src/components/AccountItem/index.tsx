import moment from "moment";
import styles from "./account.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import { useContext } from "react";
import { MessageContext } from "../../providers";

const cx = classNames.bind(styles);

const AccountItem = ({ data }: any) => {
  return (
    <div className={cx("account-item")}>
      <Image src={data?.avatar} />
      <div className={cx("content")}>
        <span className={cx("username")}>{data?.username}</span>
        <span className={cx("fullname")}>{data?.fullname}</span>
      </div>
    </div>
  );
};

const AccountMessage = ({ ...rest }) => {
  const { getSelectMessage } = useContext(MessageContext);
  const { listMessage, message } = rest;
  const handleSubmit = () => {
    getSelectMessage(listMessage);
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
