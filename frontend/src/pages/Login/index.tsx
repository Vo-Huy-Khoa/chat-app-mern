import styles from "./login.module.scss";
import { FacebookIcon, GoogleIcon, GithubIcon } from "../../components/Icon";
import classNames from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { handleLogin } from "../../services/auth";

const cx = classNames.bind(styles);

const Login = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") || "";
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (token !== "") {
      navigate("/");
    }
  }, [token]);
  const handleSubmit = (e: any) => {
    const body = {
      username: userRef.current?.value,
      password: passwordRef.current?.value,
    };
    e.preventDefault();
    try {
      handleLogin(body)
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);

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
        <div className={cx("login__form")}>
          <form className={cx("form_login")} onSubmit={handleSubmit}>
            <div className={cx("form__item")}>
              <label htmlFor="username">username</label>
              <input
                ref={userRef}
                id="username"
                type="text"
                placeholder="Type your username..."
              />
            </div>
            <div className={cx("form__item")}>
              <label htmlFor="password">password</label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="Type your password..."
              />
            </div>
            <NavLink className={cx("form--forget-password")} to="">
              <span>Forget password?</span>
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
