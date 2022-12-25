import styles from "./register.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

const Register = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("register")}>
        <div className={cx("heading")}>
          <h1>Register</h1>
        </div>
        <form className={cx('form_register')} action="" method="post">
          <div className={cx("form__item")}>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your name"
            />
          </div>
          <div className={cx("form__item")}>
            <label htmlFor="">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your user name"
            />
          </div>
          <div className={cx("form__item")}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className={cx("form__item")}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <button>Register</button>
        </form>
        <div className={cx("link-login")}>
          <NavLink to="/login">or Login?</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
