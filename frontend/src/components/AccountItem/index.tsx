import styles from "./account.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";

const cx = classNames.bind(styles);

const AccountItem = ({ data }: any) => {
  return (
    <div className={cx("account-item")}>
      <Image src={data.avatar} />
      <span className={cx("name", "text-white")}>{data.name}</span>
    </div>
  );
};

const AccountMessage = ({ data }: any) => {
  return (
    <div className={cx("account-message")}>
      <Image width="80px" height="80px" src={data.avatar} />
      <div className={cx("content")}>
        <h2 className={cx("name", "text-white")}>{data.name}</h2>
        <span className={cx("react", "text-white")}>{data.react}</span>
        <p className={cx("message", "text-gray")}>{data.message}</p>
      </div>
      <div className={cx("more")}>
        <span className={cx('text-gray')}>{data.time}</span>
      </div>
    </div>
  );
};

export { AccountItem, AccountMessage };
