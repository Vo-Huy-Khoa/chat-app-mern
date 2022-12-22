import styles from "./header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Header = () => {
    return(
        <div className={cx('container')}>
            <h1>
                heading
            </h1>
        </div>
    )
};

export default Header;
