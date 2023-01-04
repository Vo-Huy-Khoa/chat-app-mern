import styles from "./register.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { useRef } from "react";


const cx = classNames.bind(styles);

const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cx("container")}>
      <div className={cx("register")}>
        <div className={cx("heading")}>
          <h1>Register</h1>
        </div>
        <form className={cx("form_register")}>
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
              type="text"
              id="username"
              placeholder="Enter your user name"
            />
          </div>
          <div className={cx("form__item")}>
            <label htmlFor="">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
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
