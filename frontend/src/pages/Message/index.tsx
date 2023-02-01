import styles from "./message.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Message = () => {
  return <div className={cx("")}>Message</div>;
};

export default Message;
