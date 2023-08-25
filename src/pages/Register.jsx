import { useState } from "react";
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="relative flex h-[calc(100svh-55px)] items-center justify-center bg-white ">
      <div className="relative z-10 flex h-full w-full bg-white py-20 sm:min-h-[35rem] sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <div className="w-full p-5">
            <p className="font-serif text-3xl font-bold text-[#FFB100]">
              Register
            </p>
          </div>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Full Name"
              name="fullName"
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Username"
              name="username"
            />
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="rounded-md border p-2 px-4"
              placeholder="email"
              name="email"
            />
            <label htmlFor="role">Sign Up as:</label>
            <select
              id="role"
              name="role"
              className="rounded-md border p-2 px-4 after:pr-10"
            >
              <option value="Customer">Customer</option>
              <option value="Admin_Restaurant">Restaurant Admin</option>
            </select>
            <label htmlFor="password">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="rounded-md border p-2 px-4"
              placeholder="Password"
              name="password"
            />
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => setShowPass(!showPass)}
                className="checked:accent-[#FFB100]"
              />
              <label htmlFor="showPass">Show Password</label>
            </div>
            <button
              className="rounded-full bg-[#FFB100] py-3 text-white"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
