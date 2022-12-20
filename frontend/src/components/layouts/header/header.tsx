import styles from "./header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const header = () => {
    return(
        <div className={cx('container')}>
            <h1>
                heading
            </h1>
        </div>
    )
};

export default header;
