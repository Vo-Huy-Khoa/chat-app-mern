import classNames from "classnames/bind";
import styles from "./wrapper.module.scss";

const cx = classNames.bind(styles);

const Wrapper = ({ children, className, ...rest }: any) => {
  return (
    <div className={cx("wrapper", className)} {...rest}>
      {children}
    </div>
  );
};

export default Wrapper;
