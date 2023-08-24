import { useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="relative flex h-[calc(100svh-55px)] items-center justify-center overflow-x-hidden bg-white">
      <div className="relative z-10 flex h-full w-full bg-white py-20 sm:max-h-[35rem] sm:max-w-[30rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center ">
          <p className="font-serif text-3xl font-bold text-[#FFB100]">Login</p>
          <form className="flex h-full w-full flex-col justify-center gap-3 px-10">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="rounded-full border p-2 px-4"
              placeholder="Username"
              name="username"
            />
            <label htmlFor="password">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="rounded-full border p-2 px-4"
              placeholder="Password"
              name="password"
            />
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => setShowPass(!showPass)}
                className=""
              />
              <label htmlFor="showPass">Show Password</label>
            </div>
            <button className="rounded-full bg-[#FFB100] py-3 text-white">
              Login
            </button>
          </form>
          <div className="flex gap-1">
            <p>No Account?</p>
            <a className="text-[#FFB100]" href="#">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
