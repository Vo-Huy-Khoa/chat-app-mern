import styles from "./Image.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Image = ({ src, width = "32px", height = "32px", type='' }: any) => {
  return <img className={cx( 'image')} src={src} width={width} height={height} alt="" />;
};

export default Image;
