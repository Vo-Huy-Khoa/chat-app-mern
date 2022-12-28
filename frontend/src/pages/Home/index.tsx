import styles from "./home.module.scss";
import classNames from "classnames/bind";
import Image from "../../components/ui/Image";

const cx = classNames.bind(styles);

const profile = {
  avatar:
    "https://bedental.vn/wp-content/uploads/2022/11/nguoi-mau-Shin-Jae-Eun.jpg",
  name: "vo huy Khoa",
  username: "khoavh",
};
const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header", "fixed")}>
        <div className={cx("content")}>
          <Image src={profile.avatar} width="60px" height="60px" />
          <div className={cx("text")}>
            <span>{profile.name}</span>
            <p>{profile.username}</p>
          </div>
        </div>
      </div>

      <div className={cx("content")}></div>

      <div className={cx("message", "fixed")}></div>
    </div>
  );
};

export default Home;
