import styles from "../../assets/scss/register.module.scss";
import classNames from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { handleRegister } from "../../services/auth";

const cx = classNames.bind(styles);

export const Register = () => {
  const navigate = useNavigate();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState("");

  // const handleChangeImage = (e: any) => {
  //   return setAvatar(URL.createObjectURL(e.target.files[0]));
  // };

  async function handleSubmit(e: any) {
    const body = {
      fullname: fullNameRef?.current?.value,
      username: usernameRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      avatar: avatar,
    };
    e.preventDefault();
    console.table(body);

    try {
      handleRegister(body)
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          alert("Register Fail!");
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={cx("container")}>
      <div className={cx("avatar")}>
        <input
          type="text"
          onChange={(e) => {
            setAvatar(e.currentTarget.value);
          }}
          placeholder="URL avatar"
        />
        <img className={cx("avatar__image")} src={avatar} alt="" />
      </div>
      <div className={cx("register")}>
        <div className={cx("register__heading")}>
          <h1>Register</h1>
        </div>
        <form className={cx("register__form")} onSubmit={handleSubmit}>
          <div className={cx("register__form__item")}>
            <label htmlFor="">Full Name</label>
            <input
              ref={fullNameRef}
              type="text"
              id="fullname"
              placeholder="Enter your name"
            />
          </div>
          <div className={cx("register__form__item")}>
            <label htmlFor="">User Name</label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              placeholder="Enter your user name"
            />
          </div>
          <div className={cx("register__form__item")}>
            <label htmlFor="">Email</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className={cx("register__form__item")}>
            <label htmlFor="">Password</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Register</button>
        </form>
        <div className={cx("register__link")}>
          <NavLink to="/login">or Login?</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;