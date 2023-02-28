import classNames from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { FacebookIcon, GoogleIcon, GithubIcon } from "../../components";
import styles from "../../assets/scss/login.module.scss";
import { handleLogin } from "../../services/auth";
import { AuthContext } from "../../providers";

const cx = classNames.bind(styles);
const Login = () => {
  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    const body = {
      username: userRef.current?.value,
      password: passwordRef.current?.value,
    };
    e.preventDefault();
    try {
      handleLogin(body)
        .then(() => {
          navigate("/dashboard/home");
          handleAuth(true);
        })
        .catch((error) => {
          alert("Login Fail!");
        });
    } catch (err) {
      alert(err);
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
              />
            </div>
            <div className={cx("login__content__main__item")}>
              <label htmlFor="password">password</label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="Type your password..."
              />
            </div>
            <NavLink className={cx("login__content__main__forget")} to="">
              <span>Forget password?</span>
            </NavLink>
            <button>Login</button>
          </form>
        </div>
        <div className={cx("login__signup")}>
          <span>Or sign up using</span>
          <div className={cx("login__signup__icon")}>
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

export { Login };
