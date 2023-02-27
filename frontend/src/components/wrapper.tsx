import classNames from "classnames/bind";
import styles from "../assets/scss/wrapper.module.scss";

const cx = classNames.bind(styles);

export const Wrapper = ({ children, className, ...rest }: any) => {
  return (
    <div className={cx("wrapper", className)} {...rest}>
      {children}
    </div>
  );
};
