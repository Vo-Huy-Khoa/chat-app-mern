import classNames from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { handleRegister } from "../../services/auth";
import styles from "../../assets/scss/sign-up.module.scss";

const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(
    "https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_grande.gif"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const body = {
      fullname: fullNameRef?.current?.value,
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value,
      avatar: avatar,
    };
    e.preventDefault();
    try {
      await handleRegister(body);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Register failed!");
    }
  }

  return (
    <div className={cx("container")}>
      <div className={cx("register")}>
        <div className={cx("register__heading")}>
          <h1>Register</h1>
        </div>
        <form className={cx("register__form")} onSubmit={handleSubmit}>
          <div className={cx("register__form__item")}>
            <img className={cx("avatar__image")} src={avatar} alt="" />
            <input
              type="text"
              onChange={(e) => {
                setAvatar(e.currentTarget.value);
              }}
              placeholder="URL avatar"
            />
          </div>
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
            <label htmlFor="">Password</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button className={cx("btn-submit")} type="submit">
            Register
          </button>
        </form>
        <div className={cx("register__link")}>
          <NavLink to="/auth/sign-in">Sign In?</NavLink>
        </div>
      </div>
    </div>
  );
};

export { Register };
