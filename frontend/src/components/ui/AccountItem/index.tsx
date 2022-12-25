import styles from "./account.module.scss";
import classNames from "classnames/bind";
import { MenuIcon } from "../Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);



const AccountItem = ({ data }: any) => {
  return (
    <div className={!data.status ? cx("wrapper") : cx("status")}>
      <div className={cx("contain")}>
        <img className={cx("avatar")} src={data.avatar} alt={data.username} />
        <div className={cx("info")}>
          <h4 className={cx("name")}>{data.name}</h4>
          {!data.content && !data.status && (
            <span className={cx("username")}>{data.username}</span>
          )}
          {data.content && !data.status && (
            <div className={cx("text-content")}>
              <span>{data.content}</span>
            </div>
          )}
        </div>
      </div>
      {!data.content && !data.status && <MenuIcon />}
      {data.content && <FontAwesomeIcon icon={faCheck} />}
    </div>
  );
};

export default AccountItem;
