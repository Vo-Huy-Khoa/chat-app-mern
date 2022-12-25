import styles from "./notification.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faInfoCircle,
  faMessage,
  faSignOut,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const Notification = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <FontAwesomeIcon icon={faUserPlus} />
        <FontAwesomeIcon icon={faMessage} />
        <FontAwesomeIcon icon={faInfoCircle} />
        <FontAwesomeIcon icon={faSignOut} />
      </div>
      <div className={cx("media")}>
        <div className={cx("media-text")}>
          <span className={cx("media-title")}>Share Media</span>
          <NavLink to="">See All</NavLink>
        </div>
        <div className={cx("media-content")}>
          <img src="https://pbs.twimg.com/media/FX7nimGaAAAfhNP.jpg" alt="" />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg6OpC1cRHAMQeUSZ-KMKIsuiG7OKRQgF3icoQ1d0KY7KXeLNYnEmUNC__wrWUoDacZvQ&usqp=CAU"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREL8jeDuAkF7-ASSSzN6jNVvi2NC00CXzp7rfrSwkA8IoK1Qip32iJq3R7XGHBy30UJTo&usqp=CAU"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7U-lR4mfMb-jee9auafHejRXOujjsJvnInSyD0PM2Lbi8QNtAGP4LmFBEOSLDI4vg96Q&usqp=CAU"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYq7AvwNsBIvQw5vGSloWr7dPDVxjRwP8Lpg&usqp=CAU"
            alt=""
          />
          <img
            src="https://image-us.24h.com.vn/upload/3-2022/images/2022-07-11/21-1657535366-24-width650height650.jpg"
            alt=""
          />
        </div>
      </div>
      <div className={cx("media", "file")}>
        <div className={cx("media-text")}>
          <span className={cx("media-title")}>Share File</span>
          <NavLink to="">See All</NavLink>
        </div>
        <div className={cx("file-content")}>
          <div className={cx("item")}>
            <div className={cx("item_wrapper")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0tM3onKtU7fAcS-EEqNDPswVRDMmEc2AOg&usqp=CAU"
                alt=""
              />
              <div className={cx("item-content")}>
                <span className={cx("item-name")}>UARM.pem</span>
                <div className={cx("item-text")}>
                  <span>12/12/2022</span>
                  <span>20MB</span>
                </div>
              </div>
            </div>
            <FontAwesomeIcon icon={faDownload} />
          </div>
          <div className={cx("item")}>
            <div className={cx("item_wrapper")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0tM3onKtU7fAcS-EEqNDPswVRDMmEc2AOg&usqp=CAU"
                alt=""
              />
              <div className={cx("item-content")}>
                <span className={cx("item-name")}>UARM.pem</span>
                <div className={cx("item-text")}>
                  <span>04.02.22</span>
                  <span>20MB</span>
                </div>
              </div>
            </div>
            <FontAwesomeIcon icon={faDownload} />
          </div>
          <div className={cx("item")}>
            <div className={cx("item_wrapper")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0tM3onKtU7fAcS-EEqNDPswVRDMmEc2AOg&usqp=CAU"
                alt=""
              />
              <div className={cx("item-content")}>
                <span className={cx("item-name")}>UARM.pem</span>
                <div className={cx("item-text")}>
                  <span>04.02.22</span>
                  <span>20MB</span>
                </div>
              </div>
            </div>
            <FontAwesomeIcon icon={faDownload} />
          </div>
        </div>
      </div>
      <div className={cx("media", "link")}>
        <div className={cx("media-text")}>
          <span className={cx("media-title")}>Share File</span>
          <NavLink to="">See All</NavLink>
        </div>
        <div className={cx("link-content")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0tM3onKtU7fAcS-EEqNDPswVRDMmEc2AOg&usqp=CAU"
              alt=""
            />
            <div className={cx("content")}>
              <span>Banking UI kit Dark Mode</span>
              <span>https://dribbble.com/shots...</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
