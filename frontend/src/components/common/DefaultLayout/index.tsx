import classNames from "classnames/bind";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import styles from './DefaultLayout.module.scss'
const cx = classNames.bind(styles);
type Props = {
  children: JSX.Element;
};
const DefaultLayout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className={cx("container")}>
      <Header />
      <div className={cx("content")}>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
