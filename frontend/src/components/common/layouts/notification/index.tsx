import styles from './notification.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);


const Notification = () =>{
    return(
        <div className={cx('container')}>
            notification
        </div>
    )
}

export default Notification;