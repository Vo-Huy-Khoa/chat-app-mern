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
    <div className={cx("container")}>
      <div className={cx("header", "fixed")}>
        <div className={cx("header_content")}>
          <Image src={profile.avatar} width="50px" height="50px" />
          <div className={cx("header_text")}>
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
