import styles from "../assets/scss/Image.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export const Image = ({ src, width = "32px", height = "32px" }: any) => {
  return (
    <img
      className={cx("image")}
      src={src}
      width={width}
      height={height}
      alt=""
    />
  );
};
