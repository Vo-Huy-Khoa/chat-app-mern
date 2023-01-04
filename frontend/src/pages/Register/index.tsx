import styles from "./register.module.scss";
import classNames from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { handleLogin } from "../../services";

const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();
  const fullNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const body = {
    fullname: fullNameRef.current?.value,
    username: usernameRef.current?.value,
    email: emailRef.current?.value,
    password: passwordRef.current?.value,
  };

  //why log is there, value of useRef have not null?
  console.log({
    fullNameRef,
    usernameRef,
    emailRef,
    passwordRef,
  });
  const handleSubmit = async (e: any) => {
    console.table(body);

    e.preventDefault();
    try {
      handleLogin(body)
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          alert("Register Fail!");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("register")}>
        <div className={cx("heading")}>
          <h1>Register</h1>
        </div>
        <form className={cx("form_register")} onSubmit={handleSubmit}>
          <div className={cx("form__item")}>
            <label htmlFor="">Full Name</label>
            <input
              ref={fullNameRef}
              type="text"
              id="fullname"
              placeholder="Enter your name"
            />
          </div>
          <div className={cx("form__item")}>
            <label htmlFor="">User Name</label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              placeholder="Enter your user name"
            />
          </div>
          <div className={cx("form__item")}>
            <label htmlFor="">Email</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className={cx("form__item")}>
            <label htmlFor="">Password</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
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
