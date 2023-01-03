import styles from "./login.module.scss";
import { FacebookIcon, GoogleIcon, GithubIcon } from "../../components/Icon";
import classNames from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const cx = classNames.bind(styles);

const Login = () => {
  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const LOGIN_URL = `api/login` || "";
      return await axios
        .post(
          LOGIN_URL,
          JSON.stringify({
            username: username,
            password: password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        )
        .then(() => {
          alert("hello");
          navigate("/register");
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
                onChange={(e) => setUser(e.target.value)}
                id="username"
                type="text"
                placeholder="Type your username..."
                value={username}
              />
            </div>
            <div className={cx("form__item")}>
              <label htmlFor="password">password</label>
              <input
                onChange={(e) => setPwd(e.target.value)}
                id="password"
                type="password"
                placeholder="Type your password..."
                value={password}
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
