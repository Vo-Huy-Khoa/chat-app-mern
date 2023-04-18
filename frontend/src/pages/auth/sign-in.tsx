import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { handleLogin } from "../../services/auth";

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
    <div className="flex justify-center items-center h-screen bg-primary sm:bg-black text-white text-base w-full">
      <div className=" bg-black rounded-3xl p-10 flex flex-col gap-16 w-1/3 md:w-2/3 sm:w-full xl:h-4/6 md:h-4/6 lg:h-3/5 ">
        <h1 className="text-center text-6xl font-bold">Login</h1>
        <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label htmlFor="username" className="text-2xl">
              User name
            </label>
            <input
              ref={userRef}
              id="username"
              type="text"
              placeholder="Type your username..."
              defaultValue="khoavh"
              className="h-16 px-4 border-none rounded-2xl border-b-1 border-gray-400 text-black text-2xl"
            />
          </div>
          <div className=" flex flex-col gap-4">
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
            />
          </div>
          <button className="rounded-2xl h-16 bg-blue text-white text-2xl font-semibold uppercase">
            Login
          </button>
        </form>
        <div className=" flex flex-col gap-4 text-center">
          <div className=" flex justify-center gap-4"></div>
          <NavLink to="/auth/sign-up" className="text-white text-2xl">
            Sign Up?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export { Login };
