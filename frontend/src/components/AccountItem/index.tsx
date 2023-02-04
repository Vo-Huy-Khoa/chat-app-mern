import moment from "moment";
import styles from "./account.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import { createContext, useState } from "react";

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

const messageContext = createContext();

const AccountMessage = ({ data }: any) => {
  return (
    <div className={cx("account-message")}>
      <Image width="60px" height="60px" src={data?.receiverID?.avatar} />
      <div className={cx("content")}>
        <h2 className={cx("name", "text-white")}>
          {data?.receiverID?.username}
        </h2>
        <span className={cx("react", "text-white")}>{data?.react}</span>
        <p className={cx("message", "text-gray")}>{data?.message}</p>
      </div>
      <div className={cx("more")}>
        <span className={cx("text-gray")}>
          {/* {moment(data?.updateAt).format("YYYY-MM-DD HH:mm:ss")} */}
          {moment(data?.updateAt).format("HH:mm")}
        </span>
      </div>
    </div>
  );
};

export { AccountItem, AccountMessage };
