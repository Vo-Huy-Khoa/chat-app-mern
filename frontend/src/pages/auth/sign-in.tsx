import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { handleLogin } from "../../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [validate, setValidate] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const body = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    e.preventDefault();
    try {
      await handleLogin(body);
      navigate("/dashboard/home");
    } catch (error) {
      console.error(error);
      setValidate(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary sm:bg-black text-white text-base w-full">
      <div className=" bg-black rounded-3xl p-10 flex flex-col gap-16 w-1/3 md:w-2/3 sm:w-full xl:h-4/6 md:h-4/6 lg:h-3/5 ">
        <h1 className="text-center text-6xl font-bold">Login</h1>
        <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="text-2xl">
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="Type your email..."
              defaultValue="khoavh@gmail.com"
              className="h-16 px-4 border-none rounded-2xl border-b-1 border-gray-400 text-black text-2xl"
              required
            />
          </div>
          <div className=" flex flex-col gap-4 relative">
            <label htmlFor="password" className="text-2xl">
              password
            </label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              placeholder="Type your password..."
              defaultValue="1"
              className="h-16 px-4 border-none rounded-2xl border-b-1 border-gray-400 text-black text-2xl"
              required
            />
          </div>
          {validate && (
            <div className="h-16 bg-red text-white text-center rounded-2xl flex items-center justify-center text-2xl">
              Invalid email or password
            </div>
          )}
          <button className="rounded-2xl h-16 bg-blue text-white text-2xl font-semibold uppercase">
            Login
          </button>
        </form>
        <NavLink to="/auth/sign-up" className="text-white text-2xl text-center">
          Sign Up?
        </NavLink>
      </div>
    </div>
  );
};

export { Login };
