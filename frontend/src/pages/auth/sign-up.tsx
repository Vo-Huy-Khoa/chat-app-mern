import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { handleRegister } from "../../services/auth";

const Register = () => {
  const navigate = useNavigate();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(
    "https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_grande.gif"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = {
      fullname: fullNameRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      avatar: avatar,
    };
    try {
      await handleRegister(body);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Register failed!");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-primary text-white text-base w-full">
      <div className="bg-black rounded-3xl p-10 flex flex-col gap-10  sm:gap-4 w-1/3 sm:w-full h-5/7 md:w-3/5">
        <h1 className="text-center text-6xl font-bold">Register</h1>
        <form className="flex flex-col gap-10 md:gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <img
              className="w-40 rounded-full m-auto"
              src={avatar}
              alt="avatar"
            />
            <input
              type="text"
              onChange={(e) => {
                setAvatar(e.currentTarget.value);
              }}
              placeholder="URL avatar..."
              className="h-16 px-4 border-none rounded-2xl border-b-1 border-gray-400 text-black text-2xl"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-2xl">Full Name</label>
            <input
              ref={fullNameRef}
              type="text"
              placeholder="Enter your full name..."
              className="h-16 px-4 border-none rounded-2xl border-b-1 border-gray-400 text-black text-2xl"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-2xl">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email..."
              className="h-16 px-4 border-none rounded-2xl border-b-1 border-gray-400 text-black text-2xl"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-2xl">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password..."
              className="h-16 px-4 border-none rounded-2xl border-b-1 border-gray-400 text-black text-2xl"
              required
            />
          </div>
          <button
            className="rounded-2xl h-16 bg-blue text-white text-2xl font-semibold uppercase"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="flex justify-center gap-4">
          <NavLink to="/auth/sign-in" className="text-white text-2xl">
            Sign In?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export { Register };
