import classNames from "classnames/bind";
import Header from "../../components/layouts/header/header";
import styles from "./home.module.scss";

const cx = classNames.bind(styles);
const home = (children: any) => {
  return (
    <div className={cx("container")}>
      <Header />
      <div className={cx('content')}>{children}</div>
    </div>
  );
};


export default home;
