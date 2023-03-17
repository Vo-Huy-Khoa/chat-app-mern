import classNames from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import styles from "../../assets/scss/sign-in.module.scss";
import { handleLogin } from "../../services/auth";

const cx = classNames.bind(styles);
const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const body = {
      username: userRef.current?.value,
      password: passwordRef.current?.value,
    };
    e.preventDefault();
    try {
      await handleLogin(body);
      navigate("/dashboard/home");
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("login")}>
        <div className={cx("login__heading")}>
          <h1>Login</h1>
        </div>
        <div className={cx("login__content")}>
          <form className={cx("login__content__main")} onSubmit={handleSubmit}>
            <div className={cx("login__content__main__item")}>
              <label htmlFor="username">username</label>
              <input
                ref={userRef}
                id="username"
                type="text"
                placeholder="Type your username..."
                value="khoavh"
              />
            </div>
            <div className={cx("login__content__main__item")}>
              <label htmlFor="password">password</label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="Type your password..."
                value="1"
              />
            </div>
            {/* <NavLink className={cx("login__content__main__forget")} to="">
              <span>Forget password?</span>
            </NavLink> */}
            <button>Login</button>
          </form>
        </div>
        <div className={cx("login__signup")}>
          {/* <span>Or sign up using</span> */}
          <div className={cx("login__signup__icon")}>
            {/* <FacebookIcon />
            <GoogleIcon />
            <GithubIcon /> */}
          </div>
          <NavLink to="/auth/sign-up">Sign Up?</NavLink>
        </div>
      </div>
    </div>
  );
};

export { Login };
