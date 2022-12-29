import styles from "./login.module.scss";
import { FacebookIcon, GoogleIcon, GithubIcon } from "../../components/Icon";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const Login = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("login")}>
        <div className={cx("login__heading")}>
          <h1>Login</h1>
        </div>
        <div className={cx("login__form")}>
          <form className={cx('form_login')} action="" method="post">
            <div className={cx("form__item")}>
              <label htmlFor="username">username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Type your username..."
              />
            </div>
            <div className={cx("form__item")}>
              <label htmlFor="password">password</label>
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Type your password..."
              />
            </div>
            <NavLink className={cx("form--forget-password")} to="">
              <span >
                Forget password?
              </span>
            </NavLink>
            <button>Login</button>
          </form>
        </div>
        <div className={cx("signup")}>
          <span>Or sign up using</span>
          <div className={cx("icon")}>
            <FacebookIcon />
            <GoogleIcon />
            <GithubIcon />
          </div>
          <NavLink to="/register">Or sign up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
