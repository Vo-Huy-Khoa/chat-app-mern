import styles from "./home.module.scss";
import classNames from "classnames/bind";
import AccountItem from "../../components/ui/AccountItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faMicrophone, faSearch, faUpload } from "@fortawesome/free-solid-svg-icons";
import { MenuIcon } from "../../components/ui/Icon";

const cx = classNames.bind(styles);

const profile = {
  avatar:
    "https://bedental.vn/wp-content/uploads/2022/11/nguoi-mau-Shin-Jae-Eun.jpg",
  name: "vo huy Khoa",
  username: "khoavh",
};
const Home = () => {
  return (
    <div className="container">
      <div className={cx("header")}>
        <div className={cx("profile")}>
          <AccountItem data={profile} />
        </div>

        <div className={cx('more')}>
            <FontAwesomeIcon icon={faSearch} />
            <MenuIcon />
        </div>
      </div>
      <div className={cx('content')}></div>

      <div className={cx('message')}>
        <FontAwesomeIcon icon={faUpload} />
        <input type="text" placeholder="Write a message..." />
        <FontAwesomeIcon icon={faFile} />
         <FontAwesomeIcon icon={faMicrophone} />
      </div>
    </div>
  );
};

export default Home;
